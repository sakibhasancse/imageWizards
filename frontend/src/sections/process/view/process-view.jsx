import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadingOutlined from '@mui/icons-material/DownloadingOutlined';

import { uploadImage } from 'src/services/api';

import Menu from '../menu';
import ImageView from '../Image-view';
import NewImageMenu from '../new-image';
import ProgressBar from '../progress-bar';

const ProcessFileView = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [oldImages, setOldImages] = useState([])
  const [isOldImage, setIsOldImage] = useState(false)
  const { name } = useParams();
  const navigate = useNavigate();

  const [taskInfo, setTaskInfo] = useState({
    task: "",
    page_title: "",
    images: []
  });

  useEffect(() => {
    const info = getNameAndTaskByRoute(name);
    if (!info) navigate('/404')
    setTaskInfo(info);
  }, [name, navigate]);

  const handleImageUpload = (fileOrUrl) => {
    setLoading(true);
    let imageSrc;
    if (typeof fileOrUrl === 'string') imageSrc = fileOrUrl; // It's a URL
    else imageSrc = URL.createObjectURL(fileOrUrl) // It's a File

    setOriginalImage(imageSrc);

    const formData = new FormData();
    if (typeof fileOrUrl !== 'string') formData.append('image', fileOrUrl);
    else formData.append('image_url', fileOrUrl);
    formData.append('task', taskInfo.task);

    uploadImage(formData).then(response => {
      let processedFile = `data:image/jpeg;base64,${response.data.image}`
      if (response.data.image_path) {
        const baseUrl = import.meta.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:5000"
        processedFile = `${baseUrl}/processed_images/${response.data.image_path}`
      }
      setProcessedImage(processedFile);

      if (!isOldImage) {
        setOldImages((oldImage) => {
          oldImage.unshift({ org: imageSrc, proc: processedFile })
          return oldImage
        })
      } else setIsOldImage(false)

      setLoading(false);
    }).catch(err => {
      setLoading(false);
      console.log("Error happen", err.message);
    });
  };

  const handleDownload = () => {
    fetch(processedImage)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'processed-image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch(err => console.error('Error downloading the image:', err));
  };

  const loadPreviewImage = (image) => {
    setProcessedImage(image.proc)
    setOriginalImage(image.org)
    setIsOldImage(true)
  }

  return (
    <Container maxWidth="xl" sx={{ position: 'relative' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 5 }}>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 1, mb: 1, mr: 2 }}
          onClick={() => navigate('/')}
        >
          Back
      </Button>
        <Typography variant="h4">
          {taskInfo.page_title}
        </Typography>
      </Box>

      {
        !originalImage && (
          <Grid container spacing={3} justifyContent="center" sx={{ mb: 5 }}>
            <Grid item xs={12} md={6}>
              <Menu handleImageUpload={handleImageUpload} navigate={navigate} suggestedImages={taskInfo.images} />
            </Grid>
          </Grid>
        )
      }

      { originalImage && (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <ImageView imageSrc={originalImage} altText="Original Image" />
            </Grid>

            <Grid item xs={12} md={6}>
              {loading ? <ProgressBar loading={loading} /> :
                <>
                  <ImageView imageSrc={processedImage} altText="Processed Image" />
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<DownloadingOutlined />}
                    sx={{ mt: 2, mb: 1 }} onClick={handleDownload}>
                    Download Image
                  </Button>
                </>
              }
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }} >
            <NewImageMenu handleImageUpload={handleImageUpload}
              loadPreviewImage={loadPreviewImage}
              oldImages={oldImages}
              navigate={navigate}
              sx={{ position: 'absolute', bottom: 16, left: 16 }} />
          </Grid>
        </>
      )
      }

    </Container>
  );
};

export default ProcessFileView;

const getNameAndTaskByRoute = (path_name) => {
  let defaults = {}

  if (path_name === 'lesion') {
    defaults.task = "extract_lesions";
    defaults.page_title = "Extract Lesions";
    defaults.images = suggestedVesselImages()
  } else if (path_name === 'vessel') {
    defaults.task = "extract_blood_vessels";
    defaults.page_title = "Extract blood vessels";
    defaults.images = suggestedLesionsImages()
  } else defaults = null


  return defaults;
};

const suggestedLesionsImages = () => {
  const baseUrl = import.meta.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:5000"
  return [
    `${baseUrl}/assets/0.png`,
    `${baseUrl}/assets/1.png`,
    `${baseUrl}/assets/2.png`,
    `${baseUrl}/assets/3.png`
  ];
}

const suggestedVesselImages = () => {
  const baseUrl = import.meta.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:5000"
  return [
    `${baseUrl}/assets/4.jpg`,
    `${baseUrl}/assets/5.jpg`,
    `${baseUrl}/assets/6.jpg`,
    `${baseUrl}/assets/7.jpg`
  ];
}