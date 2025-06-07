from os import getenv
from dotenv import load_dotenv

load_dotenv()


def assert_env(key: str):
    result = getenv(key)
    assert result is not None
    return result


SUPABASE_URL = assert_env("SUPABASE_URL")
SUPABASE_KEY = assert_env("SUPABASE_KEY")
