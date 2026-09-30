import { useState } from 'react';

interface LevelFilterProps {
    currentLevel?: number;
    onSelectLevel?: (level: number) => void;
}

export function LevelFilter({
    currentLevel = 1,
    onSelectLevel,
}: LevelFilterProps) {
    const [selectedLevel, setSelectedLevel] = useState<number>(currentLevel);
    const levels = [
        { id: 1, label: 'Cấp độ 1' },
        { id: 2, label: 'Cấp độ 2' },
        { id: 3, label: 'Cấp độ 3' },
        { id: 4, label: 'Cấp độ 4' },
        { id: 5, label: 'Cấp độ 5' },
    ];

    const handleSelect = (levelId: number) => {
        setSelectedLevel(levelId);
        if (onSelectLevel) {
            onSelectLevel(levelId);
        }
    };

    return (
        <div className="flex flex-row border-b border-gray-200 w-full select-none">
            {levels.map((level) => {
                const isSelected = selectedLevel === level.id;
                return (
                    <div key={level.id} className="relative flex-1 text-center">
                        <button
                            type="button"
                            onClick={() => handleSelect(level.id)}
                            className={`w-full py-3 text-sm font-medium transition-colors ${isSelected ? 'text-primary' : 'text-gray-600'
                                }`}
                        >
                            {level.label}
                        </button>
                        {isSelected && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default LevelFilter;