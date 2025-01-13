import boto3
import os
import uuid

# Retrieve the bucket name from environment variables
BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"https://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}

# Initialize the S3 client
s3 = boto3.client(
    "s3",
    aws_access_key_id=os.environ.get("S3_KEY"),
    aws_secret_access_key=os.environ.get("S3_SECRET")
)

def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()  # Get the file extension
    unique_filename = uuid.uuid4().hex  # Generate a unique filename
    return f"{unique_filename}.{ext}"

def upload_file_to_s3(file, acl="public-read"):
    try:
        unique_filename = get_unique_filename(file.filename)  # Use the unique filename
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            unique_filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # Return the error if the upload fails
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{unique_filename}"}  # Return the URL of the uploaded file

def remove_file_from_s3(image_url):
    # Extract the file name from the URL
    key = image_url.rsplit("/", 1)[1]
    try:
        s3.delete_object(
            Bucket=BUCKET_NAME,
            Key=key
        )
    except Exception as e:
        return {"errors": str(e)}
    return True