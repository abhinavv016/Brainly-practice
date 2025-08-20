import { Card } from "./Card"

interface allContent {
    _id: string,
    title: string,
    type: string,
    link: string
    
}
export function ContentMapping({contents}: {contents : allContent[]}){
    return <div>
        <div className="ms-72 p-4 min-h-screen bg-gray-200 ">
            <div className="flex flex-wrap items-center gap-4">
                {contents.map(({title, _id, type, link}) => (
                <Card
                key={_id}
                type={type}
                link={link}
                title={title}
                />
            ))}
            </div>
        </div>
    </div>
}