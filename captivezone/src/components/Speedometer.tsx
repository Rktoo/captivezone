import Image from "next/image";
import ReactSpeedometer from "react-d3-speedometer";

type SpeedometerProps = {
    label: string;
    value: number;
    maxValue: number;
    image: string;
};

export default function Speedometer({ label, value, maxValue, image }: SpeedometerProps) {
    const valueFormatted = Number(value.toFixed(2));

    return (
        <div className="flex flex-col gap-4 border p-4 rounded-lg backdrop-blur-[2px] bg-black/10 text-white">
            <div className="flex justify-center items-center gap-4">
                <h3 className="text-xl underline underline-offset-4 text-amber-400">{label} :</h3>
                <p>{valueFormatted} Mbps</p>
            </div>
            <div className="relative flex flex-col justify-center items-center gap-4 border rounded-md p-4 shadow-lg">
                <div className="flex ">
                    <ReactSpeedometer
                        maxValue={maxValue}
                        minValue={0}
                        value={valueFormatted}
                        needleColor="red"
                        startColor="yellow"
                        segments={10}
                        endColor="green"
                    />
                </div>
                <Image
                src={image}
                alt="image"
                width={100}
                height={100}
                className="absolute bottom-6"
                />
            </div>
        </div>
    )
}