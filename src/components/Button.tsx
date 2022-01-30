interface ButtonProps {
    color?: 'green' | 'blue' | 'gray'
    children: any
}

export default function Button(props) {
    const color = props.color ?? 'gray'
    return (
        <button className={`
            bg-gradient-to-r from-${color}-400 to-${color}-700
            text-white px-4 py-2 rounded-md
            ${props.className}
        `}>
            {props.children}
        </button>
    )
}