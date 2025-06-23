
import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';
import Button from '../components/Button';

const NotFoundPage: React.FC = () => {
  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-6xl font-bold text-electric-orange mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-deep-purple dark:text-electric-orange mb-6">Oops! Page Not Found.</h2>
        <p className="text-lg text-gray-600 dark:text-dm-lighter-gray mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg">
            Go to Homepage
          </Button>
        </Link>
      </div>
    </AnimatedPage>
  );
};

export default NotFoundPage;
