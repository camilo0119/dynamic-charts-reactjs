import service from '../auth/FetchInterceptor';

const electoralProcessService = {}
const path = 'electoral-process'

electoralProcessService.getFindElectoralProcessInformationById = (id = '6fd39fee-313b-4fb0-89e9-54432dbe2a27') => {
    return service.get(`/${path}/findelectoralprocessinformationById/${id}`)
}

export default electoralProcessService;