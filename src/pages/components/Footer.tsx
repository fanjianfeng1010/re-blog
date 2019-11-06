import React from 'react'

interface Props {}

const Footer: React.FC<Props> = () => {
  return (
    <div className="footer-wrapper">
      <a href="http://www.beian.miit.gov.cn/">
        <span>© 2019 眼前有条河 </span>{' '}
        <span>
          {' '}
          <i></i> 粤ICP备19139935号
        </span>
      </a>
    </div>
  )
}

export default Footer
