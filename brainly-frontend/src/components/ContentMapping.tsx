import { Card } from "./Card"

interface allContent {
    _id: string,
    title: string,
    type: string,
    link: string   
}
interface ContentMappingProps {
  contents: allContent[];
  refresh: () => void;
}

export function ContentMapping({contents, refresh}: ContentMappingProps){
    return <div>
        <div className="ms-72 p-4 min-h-screen bg-gray-200 ">
            <div className="flex flex-wrap items-center gap-4">
                {contents.map(({title, _id, type, link}) => (
                <Card
                key={_id}
                _id={_id}
                type={type}
                link={link}
                title={title}
                refresh={refresh}
                />
            ))}
            </div>
        </div>
    </div>
}