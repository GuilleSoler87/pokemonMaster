import clsx from 'clsx';

const IconButton = ({
    icon,
    label,
    variant = 'outline-light',
    size = 'sm',
    isActive = false,
    activeClass = 'btn-light text-dark fw-bold',
    textClassName = 'small',
    className,
    children,
    ...props
}) => {
    return (
        <button
            className={clsx(
                "icon-button btn d-flex align-items-center gap-2 transition-all",
                size && `btn-${size}`,
                isActive ? activeClass : `btn-${variant}`,
                className
            )}
            {...props}
        >
            {icon}
            {(label || children) && (
                <span className={textClassName}>{label || children}</span>
            )}
        </button>
    );
};

export default IconButton;
