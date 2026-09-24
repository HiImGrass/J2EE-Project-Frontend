import { useNavigate } from 'react-router-dom';
import { ImgButton } from './ui/ImgButton';

interface BackButtonProps {
    iconName?: string
}

function BackButton({
    iconName = "arrow-left",
}: BackButtonProps) {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <ImgButton
            iconName={iconName}
            iconSize='sm'
            text=""
            onClick={handleGoBack}
        />
    );
}

export default BackButton;