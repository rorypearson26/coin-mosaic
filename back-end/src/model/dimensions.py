from pydantic import BaseModel


class Dimensions(BaseModel):
    width: float
    height: float
