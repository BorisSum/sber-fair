export const Preloader = () => {
    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.8)'
            }}
        >
            <div className='preloader'></div>
        </div>
    )
}