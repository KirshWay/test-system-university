import {defineStore} from 'pinia';

import {TestType} from '~/types/common';

export const usePassTest = defineStore('usePassTest', {state: () => ({test: [] as TestType[]})});
