import React from 'react';

const ImageItem = ({ src, alt, style, isEmpty }) => {
    if (isEmpty || !src) {
        return (
            <div
                className="image-item bg-secondary bg-opacity-10 rounded border border-secondary border-opacity-25 border-dashed"
                style={style}
            />
        );
    }

    return (
        <div
            className="image-item rounded p-1 bg-black bg-opacity-25 border border-secondary d-flex align-items-center justify-content-center position-relative overflow-hidden"
            style={style}
            title={alt}
        >
            <img
                src={src}
                alt={alt}
                className="img-fluid object-fit-contain w-100 h-100"
            />
        </div>
    );
};

export default ImageItem;
