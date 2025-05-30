import { apiProcessor } from '@services/apiProcessor.js';
import { conf } from '../../conf/conf.js';


const electionEndPoint = conf.baseUrl + '/api/v1/election';

export const fetchElections = async () => {
  try {
    const res = await apiProcessor({
      method: 'GET',
      url: electionEndPoint,
    });

    return res;
  } catch (error) {
    console.error(error);
  }
};
export const createElectionApi = async (data) => {
  try {
    const res = await apiProcessor({
      method: 'POST',
      url: electionEndPoint,
      isPrivate: true,
      showToast: true,
      payload: data,
      contentType: 'multipart/form-data',
    });

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchElectionApi = async (id) => {
  try {
    const res = await apiProcessor({
      method: 'GET',
      url: `${electionEndPoint}/id/${id} `,
    });

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchCandidatesApi = async (id) => {
  try {
    const res = await apiProcessor({
      method: 'GET',
      url: `${electionEndPoint}/get-election-candidates/${id}`,
    });

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getMyElectionsApi = async () => {
  try {
    const res = await apiProcessor({
      method: 'GET',
      url: electionEndPoint + '/my-elections',
      isPrivate: true,
    });

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateElectionApi = async (electionId, updates) => {
  try {
    const res = await apiProcessor({
      method: 'PUT',
      payload: updates,
      url: `${electionEndPoint}/${electionId}`,
      isPrivate: true,
      showToast: true,
    });

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteElectionApi = async (electionId) => {
  try {
    const res = await apiProcessor({
      method: 'DELETE',
      url: `${electionEndPoint}/delete/${electionId}`,
      isPrivate: true,
      showToast: true,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addCandidateToElectionApi = async (candidateId, electionId) => {
  try {
    const res = await apiProcessor({
      method: 'POST',
      url: `${electionEndPoint}/${electionId}/add-candidate`,
      isPrivate: true,
      payload: { candidateId },
      showToast: true,
    });
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCandidateFromElectionApi = async (
  candidateId,
  electionId
) => {
  try {
    const res = await apiProcessor({
      method: 'DELETE',
      url: `${electionEndPoint}/${electionId}/delete-candidate`,
      isPrivate: true,
      payload: { candidateId },
      showToast: true,
    });

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getElectionByCodeApi = async (code) => {
  try {
    const res = await apiProcessor({
      method: 'GET',
      url: `${electionEndPoint}/code/${code}`,
    });

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFinishedElectionApi = async () => {
  try {
    const res = await apiProcessor({
      url: electionEndPoint + '/finished',
      method: 'GET',
    });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
