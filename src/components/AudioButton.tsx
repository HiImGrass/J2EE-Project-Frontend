import { cld } from '@/external/Cloudinary';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState, type ButtonHTMLAttributes } from 'react';
import { Icon } from '@/components/ui/icon';

export interface AudioButtonProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
    publicId: string;
    playbackRate?: number;
    iconName?: string;
    onPlaybackError?: (error: Event) => void;
}

export const AudioButton = ({
    publicId,
    playbackRate = 1,
    iconName = 'volume',
    onPlaybackError,
    className,
    disabled,
    ...props
}: AudioButtonProps) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasError, setHasError] = useState(false);
    const audioUrl = cld.video(publicId).format('mp3').toURL();

    useEffect(() => {
        if (!publicId) {
            audioRef.current = null;
            return;
        }

        const audio = new Audio(audioUrl);
        audio.playbackRate = playbackRate;
        audioRef.current = audio;
        setIsPlaying(false);
        setHasError(false);

        const handleEnded = () => setIsPlaying(false);
        const handleError = (event: Event) => {
            setIsPlaying(false);
            setHasError(true);
            onPlaybackError?.(event);
        };

        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('error', handleError);

        return () => {
            audio.pause();
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('error', handleError);
            audioRef.current = null;
        };
    }, [audioUrl, onPlaybackError, playbackRate, publicId]);

    const handleClick = async () => {
        const audio = audioRef.current;
        if (!audio || !publicId) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
            return;
        }

        setHasError(false);
        try {
            await audio.play();
            setIsPlaying(true);
        } catch (error) {
            setIsPlaying(false);
            setHasError(true);
            onPlaybackError?.(error instanceof Event ? error : new Event('error'));
        }
    };

    return (
        <button
            type="button"
            aria-label={
                hasError
                    ? 'Không thể phát âm thanh'
                    : isPlaying
                        ? 'Tạm dừng phát âm'
                        : playbackRate < 1
                            ? 'Phát âm chậm'
                            : 'Phát âm'
            }
            aria-pressed={isPlaying}
            disabled={disabled || !publicId}
            {...props}
            onClick={(event) => {
                event.stopPropagation();
                void handleClick();
            }}
            className={cn('h-8 w-8', className)}
        >
            <Icon name={iconName} />
        </button>
    );
};
