import type React from "react";
import { useEffect, useState } from "react";
import { cld } from "@/external/Cloudinary";
import { AdvancedImage } from "@cloudinary/react";

// kiểu tỷ lệ khung hình thông dụng
const ASPECT_RATIOS = {
    square: 'aspect-square',
    video: 'aspect-video',
    auto: 'aspect-auto'
};

// Kiểu fit ảnh
const OBJECT_FITS = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill'
}

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    publicId?: string;
    fallbackSrc?: string;
    aspect?: keyof typeof ASPECT_RATIOS;
    objectFit?: keyof typeof OBJECT_FITS;
}

export const Image = (
    {
        publicId,
        src,
        alt = 'Image',
        fallbackSrc = '/img/Default.png', // cài đặt sau
        aspect = 'auto',
        objectFit = 'cover',
        className = '',
        loading = 'lazy',
        ...props
    }: ImageProps
) => {
    const [imgSrc, setImgSrc] = useState<string | undefined>(src);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        setImgSrc(src);
        setIsError(false);
    }, [src]);

    const handleError = () => {
        if (!isError) {
            setIsError(true);
            setImgSrc(fallbackSrc);
        }
    };

    // const myImage = publicId ? cld.image(publicId) : null;
    // if(publicId === "prodct_mihari_detail1_u5xf8i"){console.log(myImage)}
    // if(myImage === null && src === null){console.log(`bi null ${publicId}`)}

    return (
        <div className={`w-full h-full overflow-hidden ${ASPECT_RATIOS[aspect]} ${className}`}>
            {
                publicId ?
                    <AdvancedImage
                        cldImg={cld.image(publicId)}
                        alt={alt}
                        className={`w-full h-full transition-all duration-300 ${OBJECT_FITS[objectFit]}`}
                        onError={(e: { target: HTMLImageElement; }) => {
                            //ép kiểu về thẻ img
                            const target = e.target as HTMLImageElement;
                            target.src = fallbackSrc;
                        }}
                        {...props}
                    /> :
                    <img
                        src={imgSrc}
                        alt={alt}
                        onError={handleError}
                        className={`w-full h-full transition-all duration-300 ${OBJECT_FITS[objectFit]}`}
                        loading={loading}
                        {...props}
                    />
            }
        </div>

    );
}