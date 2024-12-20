import aiofiles
from fastapi import File


async def save_file(path: str, output_name: str, in_file: File):
    async with aiofiles.open(f"{path}/{output_name}", mode="wb") as out_file:
        while content := await in_file.read(1024):
            await out_file.write(content)
    return True
