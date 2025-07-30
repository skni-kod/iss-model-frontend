import clsx from "clsx"

type DataCardProps = {
    label: string
    value: string
    unit?: string
    type: "latitude" | "longitude" | "altitude" | "speed"
}

const typeStyles = {
    latitude: {
        text: "text-blue-600",
        border: "border-blue-300",
        bar: "bg-blue-600",
    },
    longitude: {
        text: "text-green-600",
        border: "border-green-300",
        bar: "bg-green-600",
    },
    altitude: {
        text: "text-purple-600",
        border: "border-purple-300",
        bar: "bg-purple-600",
    },
    speed: {
        text: "text-red-600",
        border: "border-red-300",
        bar: "bg-red-600",
    },
}

//max values for progres bar
const maxValues = {
    latitude: 51.6,
    longitude: 180,
    altitude: 800,
    speed: 7.66
}


export default function DataCard({ label, value, unit, type }: DataCardProps) {
    const numericValue = parseFloat(value)
    const max = maxValues[type] || 100
    const percentage = Math.min((Math.abs(numericValue) / max) * 100, 100)

    const styles = typeStyles[type]

    return (
        <div
            className={clsx(
                "p-8 border rounded-lg shadow-sm w-full bg-white",
                styles.text,
                styles.border
            )}
        >
            <p className="text-sm font-medium uppercase text-gray-600">{label}</p>
            <p className="text-2xl font-bold text-black">
                {value} {unit}
            </p>

            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                    className={clsx("h-full rounded-full", styles.bar)}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    )
}