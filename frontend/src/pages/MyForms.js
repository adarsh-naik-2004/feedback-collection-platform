import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { useNotification } from '../context/NotificationContext';
import {
  PlusIcon,
  ClipboardIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
  DocumentPlusIcon
} from '@heroicons/react/24/outline';

const useMyForms = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotification();

  const fetchForms = useCallback(async () => {
    try {
      const { data } = await api.get('/forms');
      setForms(data);
    } catch (error) {
      console.error('Failed to fetch forms', error);
      addNotification('Could not fetch your forms.', 'error');
    } finally {
      setLoading(false);
    }
  }, [addNotification]);

  useEffect(() => {
    fetchForms();
  }, [fetchForms]);

  return { forms, loading, fetchForms };
};

const FormCard = ({ form }) => {
  const { addNotification } = useNotification();
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    const url = `${window.location.origin}/form/${form._id}`;
    navigator.clipboard.writeText(url).then(() => {
      addNotification('Link copied to clipboard!', 'success');
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
      addNotification('Failed to copy link.', 'error');
    });
  };

  return (
    <div className="group flex flex-col justify-between bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-md hover:shadow-cyan-400/20 transition-all duration-300 hover:border-cyan-400/40 hover:-translate-y-1">
      <div>
        <h3 className="text-xl font-semibold text-cyan-100 truncate">{form.title}</h3>
        <p className="text-sm text-blue-200 mt-1">
          {form.questions.length} question{form.questions.length !== 1 ? 's' : ''}
        </p>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          onClick={copyToClipboard}
          className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
            isCopied
              ? 'bg-green-500 text-white cursor-default'
              : 'bg-white/10 hover:bg-white/20 text-cyan-100'
          }`}
        >
          {isCopied ? <ClipboardDocumentCheckIcon className="w-5 h-5" /> : <ClipboardIcon className="w-5 h-5" />}
          {isCopied ? 'Copied!' : 'Copy Link'}
        </button>
        <Link
          to={`/form/${form._id}/responses`}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-500 hover:from-cyan-500 hover:to-blue-400 rounded-lg transition-colors"
        >
          <ChartBarIcon className="w-5 h-5" />
          Responses
        </Link>
      </div>
    </div>
  );
};

const MyForms = () => {
  const { forms, loading } = useMyForms();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
        <div className="w-16 h-16 border-4 border-cyan-200 border-t-cyan-500 rounded-full animate-spin"></div>
        <div className="mt-4 text-lg font-medium tracking-wide text-cyan-200">Loading Your Forms...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
            My Forms
          </h2>
          <p className="text-blue-200 mt-1">Manage, share, and view responses for all your forms.</p>
        </div>
        <Link
          to="/create-form"
          className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
        >
          <PlusIcon className="w-5 h-5" />
          Create New Form
        </Link>
      </header>

      <main>
        {forms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {forms.map((form) => <FormCard key={form._id} form={form} />)}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/10 backdrop-blur-xl border-2 border-dashed border-white/10 rounded-2xl p-8 shadow-lg">
            <DocumentPlusIcon className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-cyan-100 mb-2">No forms yet.</h3>
            <p className="text-blue-200 mb-6 max-w-md mx-auto">Click below to create your first form and start collecting data.</p>
            <Link
              to="/create-form"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
            >
              Create Your First Form
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyForms;
