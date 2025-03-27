export default {
  formatDateTime(date: Date | string): string {
    if (!date) {
      return '-'
    }
    const dateTime = new Date(date)
    if (isNaN(dateTime.getTime())) {
      return '-'
    }
    return dateTime.toLocaleString('th-TH', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  },
  statusToHtml(status: any) {
    switch (status) {
      case 'approved':
        return '<span class="badge badge-xs badge-success whitespace-nowrap">approved</span>'
      case 'pending':
        return '<span class="badge badge-xs badge-warning whitespace-nowrap">pending</span>'
      case 'rejected':
        return '<span class="badge badge-xs badge-error whitespace-nowrap">rejected</span>'
      case 'request is not successful':
        return '<span class="badge badge-xs badge-neutral whitespace-nowrap">request is not successful</span>'
    }
  },
  statusToHtmlStudent(status: any) {
    switch (status) {
      case true:
        return '<span class="badge badge-xs badge-success whitespace-nowrap">Yes</span>'
      case false:
        return '<span class="badge badge-xs badge-error whitespace-nowrap">NO</span>'
    }
  },
  displayFileFromURL(filePath: string) {
    const imgExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
    const fileExt = filePath.split('.').pop()?.toLowerCase()

    if (fileExt && imgExtensions.includes('.' + fileExt)) {
      return {
        type: 'image',
        html: `<a href="${filePath}" data-fancybox="gallery">
                  <img src="${filePath}" alt="Image"/>
                </a>`,
      }
    } else {
      return {
        type: 'file',
        html: `<a class="btn btn-neutral" href="${filePath}" data-fancybox="gallery">
                  รายละเอียดไฟล์
                </a>`,
      }
    }
  },
}
