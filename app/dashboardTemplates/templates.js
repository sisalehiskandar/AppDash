import applicationOS from './applicationOS.json'
import applicationOSImg from './applicationOS.png'
import applicationPerformance from './applicationPerformance.json'
import applicationPerformanceImg from './applicationPerformance.png'
import applicationMemory from './applicationMemory.json'
import applicationMemoryImg from './applicationMemory.png'
import devSample1 from './devSample1.json'
import devSample1Img from './devSample1.png'
import opsSample2 from './opsSample2.json'
import opsSample2Img from './opsSample2.png'
import opsSample3 from './opsSample3.json'
import opsSample3Img from './opsSample3.png'
import opsSample4 from './opsSample4.json'
import opsSample4Img from './opsSample4.png'
import overallApplicationHealth from './overallApplicationHealth.json'
import overallApplicationHealthImg from './overallApplicationHealth.png'

export default {
  'Application - OS': { json: applicationOS, img: applicationOSImg },
  'Application - Performance': {
    json: applicationPerformance,
    img: applicationPerformanceImg,
  },
  'Application - Memory': {
    json: applicationMemory,
    img: applicationMemoryImg,
  },
  'Dev - Sample 1': { json: devSample1, img: devSample1Img },
  'Ops - Sample 2': { json: opsSample2, img: opsSample2Img },
  'Ops - Sample 3': { json: opsSample3, img: opsSample3Img },
  'Ops - Sample 4': { json: opsSample4, img: opsSample4Img },
  'Overall Application Health': {
    json: overallApplicationHealth,
    img: overallApplicationHealthImg,
  },
}
