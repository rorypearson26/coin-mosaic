from typing import List

from pydantic import BaseModel


class GreyscaleManipulationDto(BaseModel):
    width: int
    height: int
    imgBytes: str
    imgIntensityArray: List[List[int]]