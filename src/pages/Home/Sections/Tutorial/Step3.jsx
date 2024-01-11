import { Box, Typography } from '@mui/material'
import { read, utils } from 'xlsx'
import InlineTypo from '~/components/InlineTypo'
import { toCSV, downloadFile } from '~/lib/handleXLSX'

const HandleFileBtn = () => {
  const isXLSX = (fileName) => {
    const arr = fileName.split('.')
    return arr[arr.length - 1] === 'xlsx' ? true : false
  }

  const handleFileChange = () => {
    // Lấy file đầu tiên trong danh sách files
    const file = document.getElementById('inputFile').files[0]

    if (file) {
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
        try {
          downloadFile(toCSV(jsonData), 'output.csv')
          alert('Thành Công!')
        } catch (error) {
          alert(error)
        }
      }
      reader.readAsArrayBuffer(file)
    } else {
      alert('No file selected.')
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <input type='file' id='inputFile' />
      <Box
        onClick={() => handleFileChange()}
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
  )
}

const Step3 = () => {
  return (
    <Box
      sx={{
        textIndent: '10px',
        textAlign: 'justify'
      }}
    >
      <Typography sx={{ display: 'inline', fontWeight: 'bold' }}>
        Bước 3:
      </Typography>{' '}
      <Box sx={{ border: '1px solid #000', p: '5px 10px' }}>
        <Typography>Import file đã convert:</Typography>
        <HandleFileBtn />
        <Typography sx={{ textIndent: '10px' }}>
          * Sau khi nhấn <InlineTypo name={'"Xử ly File"'} />, nếu thành công sẽ
          download file <InlineTypo name={'"output.csv"'} /> về máy.
        </Typography>
      </Box>
    </Box>
  )
}

export default Step3
