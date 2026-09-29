from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    SUPABASE_URL: str = ''
    SUPABASE_KEY: str = ''
    GEMINI_API_KEY: str = ''
    DEMO_MODE: bool = True
    OVERPASS_URL: str = 'https://overpass-api.de/api/interpreter'
    NOMINATIM_URL: str = 'https://nominatim.openstreetmap.org/search'
    OPEN_METEO_URL: str = 'https://api.open-meteo.com/v1/forecast'
    SEARCH_RADIUS_KM: int = 5
    USER_AGENT: str = 'GRAMSATHI/1.0'

    model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8')

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        if not self.SUPABASE_URL:
            self.DEMO_MODE = True

settings = Settings()
