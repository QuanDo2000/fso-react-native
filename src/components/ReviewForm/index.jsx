import { useNavigate } from 'react-router-native';
import useReview from '../../hooks/useReview';

import ReviewContainer from './ReviewContainer';

const ReviewForm = () => {
  const navigate = useNavigate();
  const [createReview] = useReview();

  const onSubmit = (values) => {
    const review = {
      ownerName: values.owner,
      repositoryName: values.repository,
      rating: Number(values.rating),
      text: values.review,
    };

    createReview(review)
      .then((result) => {
        if (result) {
          navigate(`/repositories/${result.createReview.repositoryId}`);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return <ReviewContainer onSubmit={onSubmit} />;
};

export default ReviewForm;
