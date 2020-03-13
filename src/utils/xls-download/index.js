// import xlsDownload from @/utils/xls-download;
/**
 * 或者使用 import { saveAs } from 'file-saver';
 */
export default {
  iframeDownLoad(url) {
    let iframe = document.createElement('iframe');
    iframe.id = '_iframe_load';
    iframe.src = url;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    // 由于onload下载文件不好用，交互不舒服，所以采用轮询方式，加载完之后移除iframe
    const timer = setInterval(() => {
      iframe = document.getElementById('_iframe_load');
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      if (iframeDoc.readyState === 'complete' || iframeDoc.readyState === 'interactive') {
        iframe.parentNode.removeChild(iframe);
        clearInterval(timer);
      }
    }, 3000);
  },
};
