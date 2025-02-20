interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export const tokenService = {
    setTokens(tokens: Tokens) {
        localStorage.setItem('access_token', tokens.accessToken);
        localStorage.setItem('refresh_token', tokens.refreshToken);
    },

    getTokens(): Tokens | null {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');
        
        if (accessToken && refreshToken) {
            return { accessToken, refreshToken };
        }
        return null;
    },

    clearTokens() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }
};