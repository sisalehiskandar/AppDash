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
import biqExecutiveDashboard from './biqExecutiveDashboard.json'
import biqExecutiveDashboardImg from './biqExecutiveDashboard.png'
import adDevOpsReleaseAnalyticsv2 from './adDevOpsReleaseAnalyticsv2.json'
import adDevOpsReleaseAnalyticsv2Img from './adDevOpsReleaseAnalyticsv2.png'
import devDashboardBTs from './devDashboardBTs.json'
import devDashboardBTsImg from './devDashboardBTs.png'
import awsMetrics from './awsMetrics.json'
import awsMetricsImg from './awsMetrics.png'
import biqConversionImpact from './biqConversionImpact.json'
import biqConversionImpactImg from './biqConversionImpact.png'
import userJourneyDashboard from './userJourneyDashboard.json'
import userJourneyDashboardImg from './userJourneyDashboard.png'
import biqSegmentation from './biqSegmentation.json'
import biqSegmentationImg from './biqSegmentation.png'

export default {
  'Application - OS': {
    json: applicationOS,
    img: applicationOSImg,
    fullDashboard: true,
    categories: ['ops'],
  },
  'Application - Performance': {
    json: applicationPerformance,
    img: applicationPerformanceImg,
    fullDashboard: true,
    categories: ['ops'],
  },
  'Application - Memory': {
    json: applicationMemory,
    img: applicationMemoryImg,
    fullDashboard: true,
    categories: ['ops'],
  },
  'Dev - Sample 1': {
    json: devSample1,
    img: devSample1Img,
    fullDashboard: true,
    categories: ['dev'],
  },
  'Ops - Sample 2': {
    json: opsSample2,
    img: opsSample2Img,
    fullDashboard: true,
    categories: ['ops'],
  },
  'Ops - Sample 3': {
    json: opsSample3,
    img: opsSample3Img,
    fullDashboard: true,
    categories: ['ops'],
  },
  'Ops - Sample 4': {
    json: opsSample4,
    img: opsSample4Img,
    fullDashboard: true,
    categories: ['ops'],
  },
  'Overall Application Health': {
    json: overallApplicationHealth,
    img: overallApplicationHealthImg,
    fullDashboard: true,
    categories: ['application'],
  },
  'BiQ - Executive Dashboard': {
    json: biqExecutiveDashboard,
    img: biqExecutiveDashboardImg,
    fullDashboard: false,
    categories: ['biq'],
  },
  'AD-DevOps Release Analytics v2.0': {
    json: adDevOpsReleaseAnalyticsv2,
    img: adDevOpsReleaseAnalyticsv2Img,
    fullDashboard: false,
    categories: ['biq'],
  },
  'Dev Dashboard - BTs': {
    json: devDashboardBTs,
    img: devDashboardBTsImg,
    fullDashboard: true,
    categories: ['bt'],
  },
  'AWS Metrics': {
    json: awsMetrics,
    img: awsMetricsImg,
    fullDashboard: false,
    categories: ['aws'],
  },
  'BiQ Conversion Impact': {
    json: biqConversionImpact,
    img: biqConversionImpactImg,
    fullDashboard: false,
    categories: ['biq'],
  },
  'BiQ User Journey': {
    json: userJourneyDashboard,
    img: userJourneyDashboardImg,
    fullDashboard: false,
    categories: ['biq'],
  },
  'BiQ Segmentation': {
    json: biqSegmentation,
    img: biqSegmentationImg,
    fullDashboard: false,
    categories: ['biq'],
  },
}
