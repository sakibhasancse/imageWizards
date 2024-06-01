import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
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
    page_title: ""
  });

  useEffect(() => {
    const info = getNameAndTaskByRoute(name);
    if (!info) navigate('/404')
    setTaskInfo(info);
  }, [name, navigate]);

  const handleImageUpload = (file) => {
    setLoading(true);
    const newFile = URL.createObjectURL(file)
    setOriginalImage(newFile);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('task', taskInfo.task);

    uploadImage(formData).then(response => {
      const processedFile = `data:image/jpeg;base64,${response.data.image}`
      setProcessedImage(processedFile);

      if (!isOldImage) {
        setOldImages((oldImage) => {
          oldImage.unshift({ org: newFile, proc: processedFile })
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
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'processed-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const loadPreviewImage = (image) => {
    setProcessedImage(image.proc)
    setOriginalImage(image.org)
    setIsOldImage(true)
  }

  return (
    <Container maxWidth="xl" sx={{ position: 'relative' }}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        {taskInfo.page_title}
      </Typography>

      {
        !originalImage && (
          <Grid container spacing={3} justifyContent="center" sx={{ mb: 5 }}>
            <Grid item xs={12} md={6}>
              <Menu handleImageUpload={handleImageUpload} navigate={navigate} />
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
  } else if (path_name === 'vessel') {
    defaults.task = "extract_blood_vessels";
    defaults.page_title = "Extract blood vessels";
  } else defaults = null


  return defaults;
};
