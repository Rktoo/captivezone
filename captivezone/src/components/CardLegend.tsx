import { dataType } from "@/lib/data";

export default function CardLegend({title, description}: dataType)
{
    return (
        <div>
            <h1 className="text-lg">{title}</h1>
            <p className="text-sm font-thin">{description}</p>
        </div>
    )
}