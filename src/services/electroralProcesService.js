import service from '../auth/FetchInterceptor';

const electoralProcessService = {}
const path = 'electoral-process'

electoralProcessService.getFindElectoralProcessInformationById = (id) => {
    return service.get(`/${path}/findelectoralprocessinformationById/${id}`)
}

export default electoralProcessService;