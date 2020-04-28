interface RefreshTokenGateway{
    createRefreshToken(input: RefreshToken): Promise<void>;
    getRefreshToken(user_id: string): Promise<RefreshToken | undefined>;
    deleteRefreshToken(user_id: string): Promise<void>;
}

interface RefreshToken{
    token: string;
    user_id: string;
}