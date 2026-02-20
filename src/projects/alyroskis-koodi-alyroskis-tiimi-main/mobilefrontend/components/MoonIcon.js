import { useTheme } from '../utils/ThemeContext';
import Feather from '@expo/vector-icons/Feather';
import { Pressable } from 'react-native';

const MoonIcon = () => {
    const { colors } = useTheme();
    const { isDark, toggleTheme } = useTheme();
    const iconName = isDark ? "sun" : "moon";
    
    return (
        <Pressable onPress={toggleTheme}>
            <Feather name={iconName} size={24} color={colors.iconColor} />
        </Pressable>
    )
};

export default MoonIcon;