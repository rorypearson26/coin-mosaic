import base64
import json
import logging
from typing import Annotated

import jsonpickle
from fastapi import APIRouter, UploadFile, File, Form
import cv2
import numpy as np
from fastapi.responses import Response

from src.model.greyscale_manipulation_dto import GreyscaleManipulationDto

logging.basicConfig(level=logging.INFO)
router = APIRouter()


@router.post("/upload_image", response_model=GreyscaleManipulationDto)
async def create_upload_file(
        width: Annotated[int, Form()],
        height: Annotated[int, Form()],
        image: Annotated[UploadFile, Form()]):
    try:
        contents = await image.read()  # Read the uploaded file contents
        np_greyscale = cv2.imdecode(
            np.frombuffer(contents, np.uint8), cv2.IMREAD_GRAYSCALE
        )
        _, img = cv2.imencode('.png', np_greyscale)
        response = GreyscaleManipulationDto(width=width, height=height, imgBytes=img.tobytes(), imgIntensityArray=np_greyscale.tolist())

        return Response(response)

    except Exception as e:
        return Response(e, 500)


@router.post("/upload")
async def upload(
        width: Annotated[str, Form()],
        height: Annotated[str, Form()],
        image: Annotated[UploadFile, Form()]):
    contents = await image.read()
    img = cv2.imdecode(
        np.frombuffer(contents, np.uint8), cv2.IMREAD_GRAYSCALE
    )
    _, img_encoded = cv2.imencode(".jpg", img)
    logging.info(img_encoded.shape)
    if img is None:
        return {"error": "Could not decode image."}

    small_image = {"width": width, "height": height, "image": json.dumps(img_encoded.tolist())}

    return small_image
