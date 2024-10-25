import useData from "../hooks/useFetch";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function DataDisplay({ title, endpoint }) {

    const { data, isPending, error } = useData(endpoint);

    return (
        <div className="dataDisplay">
            <h2 className="title">{title}</h2>
            <div className="data-container">
                {isPending && 
                    Array(12).fill(0).map((_, index) => (
                        <div key={index}>
                            <Skeleton height={300} width={200} baseColor="#222" highlightColor="#555" />
                            <Skeleton height={20} width={200} baseColor="#222" highlightColor="#555" style={{ marginTop: '10px' }} />
                        </div>
                    ))
                }

                {error && <h2>Error: {error}</h2>}
                
                {data && data.slice(0, 12).map((item) => (
                    <div className="data" key={item.id} title={item.title || item.name}>
                        <img
                            src={item.poster_path ? `https://image.tmdb.org/t/p/original${item.poster_path}` : 'fallback-image-url.jpg'}
                            alt={`${item.title || item.name} poster`} 
                        />
                        <h3>{item.title || item.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DataDisplay;
