# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-10-11  Python: 3.7


"""
pip3 install opencv-python
"""

import cv2 as cv


def get_pos(image):
    """
    缺口轮廓检测
    对付腾讯滑块够用
    该方法识别率 95% 左右
    """
    blurred = cv.GaussianBlur(image, (5, 5), 0)
    canny = cv.Canny(blurred, 200, 400)
    contours, hierarchy = cv.findContours(canny, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
    for i, contour in enumerate(contours):
        m = cv.moments(contour)
        if m['m00'] == 0:
            cx = cy = 0
        else:
            cx, cy = m['m10'] / m['m00'], m['m01'] / m['m00']
        if 6000 < cv.contourArea(contour) < 8000 and 370 < cv.arcLength(contour, True) < 390:
            if cx < 400:
                continue
            x, y, w, h = cv.boundingRect(contour)  # 外接矩形
            cv.rectangle(image, (x, y), (x + w, y + h), (0, 0, 255), 2)
            cv.imshow('image', image)
            return x
    return 0


if __name__ == '__main__':
    """
    这里是滑块缺口识别
    识别到后
    1。可以通过自动化工具取拖动滑块
    2。可以通过参数解析的形式生成参数提交通过验证
    """
    img0 = cv.imread('bg.jpeg')
    get_pos(img0)
    cv.waitKey(0)
    cv.destroyAllWindows()
