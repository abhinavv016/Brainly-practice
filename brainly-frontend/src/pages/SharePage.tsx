import { Card } from "../components/Card";
import { useContent } from "../hooks/useContent";

export function SharePage(){
    const {contents = []} = useContent() || [];
    return <div className="p-4 min-h-screen bg-gray-200 ">
        <div className="flex flex-wrap items-center gap-4"> 
                {contents.map(({title, type, link}) =><Card
                title={title} 
                link={link} 
                type={type}
                />
                )}
              </div>
    </div>
}