import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAuthData = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('token');
                const storedUser = await AsyncStorage.getItem('user');
                if (storedToken) {
                    setToken(storedToken);

                    if (storedUser) {
                        try {
                            setUser(JSON.parse(storedUser));
                        } catch (e) {
                            console.warn('Invalid stored user, clearing it.', e);
                            await AsyncStorage.removeItem('user');
                            setUser(null);
                        }
                    }
                }
            } catch (error) {
                console.error('Failed to load auth data', error);
            } finally {
                setLoading(false); 
            }
        };
        loadAuthData();
    }, []);

    const login = async (newToken, newUser) => {
        setToken(newToken);
        setUser(newUser);
        try {
            await AsyncStorage.setItem('token', newToken);
            await AsyncStorage.setItem('user', JSON.stringify(newUser));
        } catch (e) {
            console.error('Failed to save auth data', e);
        }
    };

    const logout = async () => {
        setToken(null);
        setUser(null);
        try {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
        } catch (e) {
            console.error('Failed to remove auth data', e);
        }
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};