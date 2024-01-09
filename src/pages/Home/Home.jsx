import { Box, Container, Typography } from '@mui/material'
import { read, utils } from 'xlsx'
import { toCSV, downloadFile } from '~/lib/handleXLSX'

const isXLSX = (fileName) => {
  const arr = fileName.split('.')
  return arr[arr.length - 1] === 'xlsx' ? true : false
}

const Home = () => {
  const handleFileChange = () => {
    const file = document.getElementById('inputFile').files[0] // Lấy file đầu tiên trong danh sách files

    if (file) {
      try {
        if (!isXLSX(file.name)) {
          alert('Vui lòng input File định dạng .xlsx!')
          return
        }
        const reader = new FileReader()

        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result)
          const workbook = read(data, { type: 'array' })

          const sheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[sheetName]

          const jsonData = utils.sheet_to_json(worksheet)

          downloadFile(toCSV(jsonData), 'output.csv')
        }

        reader.readAsArrayBuffer(file)
      } catch (error) {
        alert('Có Lỗi! Bạn vui lòng liên hệ với mình qua info bên dưới nhé!')
      }
    } else {
      alert('No file selected.')
    }
  }

  return (
    <Container
      sx={{
        width: { md: '650px', sm: '450px', xs: '350px' },
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '28px'
        }}
      >
        {/* Tiêu đề */}
        <Box
          sx={{ backgroundColor: '#000', p: '5px 40px', borderRadius: '16px' }}
        >
          <Typography
            sx={{
              fontSize: { md: '16px', sm: '14px', xs: '12px' },
              color: '#fff',
              fontFamily: 'Inter',
              textAlign: 'center'
            }}
          >
            VLU CALENDAR GENERATOR
          </Typography>
        </Box>
        {/* Giới thiệu web */}
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              width: '100%',
              backgroundColor: '#ECECEC',
              p: '5px 10px',
              borderRadius: '16px'
            }}
          >
            <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
              Đây là gì?
            </Typography>
            <Typography
              sx={{
                textIndent: '10px',
                textAlign: 'justify'
              }}
            >
              Xin chào! Mình là{' '}
              <Typography sx={{ color: '#731CFF', display: 'inline' }}>
                VLU CALENDAR GENERATOR
              </Typography>
              . Mình được sinh ra để giúp bạn tạo lịch từ trang{' '}
              <a href='https://online.vlu.edu.vn/Home/Schedules'>
                online.vlu.edu.vn
              </a>{' '}
              sang{' '}
              <a href='https://calendar.google.com/calendar/u/0/r'>
                Google Calendar
              </a>{' '}
              với mục đích là thuận tiện xem lịch học của mình. Vì mỗi lần bạn
              muốn xem lịch học của mình thì phải mất tầm 3-4p để đăng nhập, còn
              nếu bạn tự điền lịch lên Google Calendar thì sẽ tốn thời gian của
              bạn. Mình ở đây để giúp các bạn :D
            </Typography>
          </Box>
        </Box>
        {/* Hướng dẫn các bước */}
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              width: '100%',
              backgroundColor: '#ECECEC',
              p: '5px 10px',
              borderRadius: '16px'
            }}
          >
            <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
              Hướng dẫn:
            </Typography>
            <Typography
              sx={{
                textIndent: '10px',
                textAlign: 'justify'
              }}
            >
              <Typography sx={{ display: 'inline', fontWeight: 'bold' }}>
                Bước 1:
              </Typography>{' '}
              <Typography sx={{ display: 'inline' }}>
                Đăng nhập vào trang{' '}
                <a href='https://online.vlu.edu.vn/Login'>online.vlu.edu.vn</a>{' '}
                để tải lịch học của bạn với định dạng{' '}
                <Typography sx={{ display: 'inline', color: '#731CFF' }}>
                  PDF
                </Typography>
                .
              </Typography>
            </Typography>
            <Typography
              sx={{
                textIndent: '10px',
                textAlign: 'justify'
              }}
            >
              <Typography sx={{ display: 'inline', fontWeight: 'bold' }}>
                Bước 2:
              </Typography>{' '}
              <Typography>
                Convert File PDF sang định dạng XLSX bằng công cụ tại trang web:{' '}
                <a href='https://www.adobe.com/acrobat/online/pdf-to-excel.html'>
                  Acrobat Online Tools
                </a>
                . Tool ok nhất về convert PDF to Excel mình tìm được (ý kiến cá
                nhân).
              </Typography>
            </Typography>
            <Typography sx={{ display: 'inline', fontWeight: 'bold' }}>
              Bước 3:
            </Typography>{' '}
            <Box sx={{ border: '1px solid #000', p: '5px 10px' }}>
              <Typography sx={{ display: 'inline' }}>
                Tải file bạn đã convert sang định dạng excel lên đây:
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <input type='file' id='inputFile' />
                <Box
                  onClick={handleFileChange}
                  sx={{
                    backgroundColor: '#999',
                    width: 'fit-content',
                    p: '5px 10px',
                    borderRadius: '16px',
                    ':hover': {
                      cursor: 'pointer',
                      color: '#fff',
                      fontWeight: 'bold'
                    }
                  }}
                >
                  Xử lý file
                </Box>
              </Box>
            </Box>
            <Typography sx={{ textIndent: '10px' }}>
              * Sau khi nhấn {'Xử lý file'}, nếu thành công bạn sẽ được tự động
              download 1 file đã xử lý về máy.
            </Typography>
            <Typography sx={{ display: 'inline', fontWeight: 'bold' }}>
              Bước 4:
            </Typography>{' '}
            <Typography sx={{ display: 'inline' }}>
              Nhập file đã được xử ý lên{' '}
              <a href='https://calendar.google.com/calendar/u/0/r'>
                Google Calendar:
              </a>
              <Typography
                sx={{
                  textIndent: '20px',
                  fontStyle: 'italic'
                }}
              >
                - Truy cập:
                {
                  <Typography sx={{ display: 'inline' }}>
                    &ldquo;Lịch khác&ldquo; {' -> '}
                  </Typography>
                }{' '}
                {
                  <Typography sx={{ display: 'inline', fontWeight: 'bold' }}>
                    nhấn vào dấu &ldquo;+&ldquo; (Thêm các lịch khác)
                  </Typography>
                }{' '}
                {<Typography sx={{ display: 'inline' }}>{'->'}</Typography>}{' '}
                <Typography sx={{ display: 'inline', fontWeight: 'bold' }}>
                  Tạo lịch mới.
                </Typography>
                <Typography>
                  * Tại đây bạn có thể đặt tên lịch của mình: Mình sẽ đặt{' '}
                  <Typography sx={{ display: 'inline', fontWeight: 'bold' }}>
                    &ldquo;LỊCH HỌC VLU&ldquo;
                  </Typography>
                </Typography>
              </Typography>
              <Typography
                sx={{
                  textIndent: '20px',
                  fontStyle: 'italic'
                }}
              >
                - Tại trang cài đặt bạn vừa đặt tên lịch, nhấn vào{' '}
                <Typography sx={{ display: 'inline', fontWeight: 'bold' }}>
                  &ldquo;NHẬP VÀ XUẤT&ldquo;
                </Typography>
                {<Typography sx={{ display: 'inline' }}>{'->'}</Typography>}{' '}
                <Typography sx={{ display: 'inline', fontWeight: 'bold' }}>
                  &ldquo;Chọn lịch của bạn đã tạo&ldquo;
                </Typography>
                {<Typography sx={{ display: 'inline' }}>{'->'}</Typography>}{' '}
                <Typography sx={{ display: 'inline', fontWeight: 'bold' }}>
                  &ldquo;Import File output.csv đã được tải về máy của
                  bạn.&ldquo;
                </Typography>
              </Typography>
            </Typography>
            <Typography
              sx={{ fontSize: '12px', fontWeight: 'bold', textAlign: 'end' }}
            >
              Done!
            </Typography>
          </Box>
        </Box>
        {/* F&Q */}
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              width: '100%',
              backgroundColor: '#ECECEC',
              p: '5px 10px',
              borderRadius: '16px'
            }}
          >
            <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
              troubleshoots & Questions:
            </Typography>
            <Typography sx={{ textIndent: '10px' }}>
              * Website này mình code theo output excel của tool Acrobat nên nếu
              bạn sử dụng phần mền chuyển đổi file khác từ pdf sang excel thì có
              thể sẽ không sử dụng dược.
            </Typography>
            <Typography sx={{ textIndent: '10px' }}>
              * Mình chỉ mới test trên máy mình nên còn nhiều thiếu sót, có thể
              sẽ không hoạt động trên máy của bạn.
            </Typography>
            <Typography
              sx={{ textIndent: '10px', pt: '20px', fontWeight: 'bold' }}
            >
              * Nếu bạn gặp vấn đề về việc sử dụng hãy liên hệ mình để được hỗ
              trợ nhé:{' '}
              <a href='https://www.facebook.com/nhkhoa.a/'>Facebook mình</a>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
export default Home
