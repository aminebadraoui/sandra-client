
const StyledButton = ({
    title,
    onClick,
    outline,
    disabled,
    className
}) => {

    return <button className={`
       ${className}
        p-2 w-full font-semibold hover:opacity-95 rounded 
        ${outline ? `bg-white border-[1px] border-black text-black` : ` bg-primary-500 text-white`}
        ${disabled ? 'opacity-75' : 'opacity-100'}
        ${disabled ? 'cursor-not-allowed' : ''}`
    }
        onClick={onClick}
        disabled={disabled} >
        {title}
    </button >
}

export default StyledButton;