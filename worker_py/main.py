import time
import uvicorn

from fastapi import FastAPI, Body

from typing import Annotated

from pydantic import BaseModel, Field


app = FastAPI()

@app.middleware("http")
async def add_process_time_header(request, call_next):
    start_time = time.time()
    response = await call_next(request)
    print(f"Processing time: {time.time() - start_time}")
    return response

class IJob(BaseModel):
    job_params: str = Field(
        title="Job Parameters",
        description="The parameters for the job",
        max_length=100,
        examples=["param1"],
    )
    ttl: int = Field(
        title="Time to live",
        description="The time to live for the job",
        ge=0,
        le=100,
        examples=[10],
    )

@app.post(
    "/job",
    summary="Start a job",
    description="Start a job with the given parameters",
)
async def start_job(
    job: IJob,
):
    return { "job_params": job.job_params, }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)