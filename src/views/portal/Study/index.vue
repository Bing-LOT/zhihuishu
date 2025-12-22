<template>
  <div class="study-page">
    <!-- 背景 -->
    <div class="study-bg"></div>

    <!-- 优秀思政课堂区块 -->
    <section class="excellent-courses">
      <div class="excellent-courses__container">
        <!-- 标题 -->
        <div class="section-header">
          <button class="more-btn" style="opacity: 0;">
            <span>查看更多</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <div class="section-title-wrapper">
            <div class="section-title-bg">
              <img src="/images/xiaohui1.png" alt="" />
            </div>
            <div class="section-title-left">
              <svg xmlns="http://www.w3.org/2000/svg" width="122" height="37" viewBox="0 0 122 37" fill="none">
                <path d="M55.4995 25.1402C58.5629 25.1402 60.8086 22.6335 60.8086 19.5701C60.8086 16.5068 58.565 14 55.4995 14" stroke="#EFE0D3" stroke-linejoin="round"/>
                <path d="M54.8086 36.2809C51.7452 36.2809 49.4995 33.7741 49.4995 30.7108C49.4995 27.6474 51.7431 25.1406 54.8086 25.1406" stroke="#EFE0D3" stroke-linejoin="round"/>
                <path d="M121.283 36.2801L50.4349 36.2805C47.3715 36.2805 44.8647 33.7737 44.8647 30.7104C44.8647 27.647 47.3715 25.1402 50.4349 25.1402H58H51.8651H59.4303C62.4936 25.1402 65.0004 22.6335 65.0004 19.5701C65.0004 16.5068 62.4936 14 59.4303 14L0 14" stroke="#EFE0D3" stroke-linejoin="round"/>
                <path d="M102.5 36.8879H81.5V36.2697C81.5 30.6064 86.2102 25.999 92 25.999C97.7898 25.999 102.5 30.6064 102.5 36.2697V36.8879ZM82.7825 35.6537H101.215C100.89 30.9583 96.8809 27.2355 91.9977 27.2355C87.1145 27.2355 83.1054 30.9583 82.7802 35.6537" fill="#EFE0D3"/>
                <path d="M98.6109 36.8894H85.3887V36.2693C85.3887 32.7501 88.3548 29.8894 91.9986 29.8894C95.6424 29.8894 98.6085 32.7523 98.6085 36.2693V36.8894H98.6109ZM86.7111 35.6514H97.2884C96.9719 33.1076 94.7209 31.1296 92.001 31.1296C89.281 31.1296 87.03 33.1076 86.7111 35.6514Z" fill="#EFE0D3"/>
                <path d="M95.4854 36.7893H88.4854V36.4448C88.4854 34.4896 90.0557 32.9004 91.9847 32.9004C93.9138 32.9004 95.4841 34.4909 95.4841 36.4448V36.7893H95.4854ZM89.1855 36.1015H94.7852C94.6176 34.6883 93.426 33.5894 91.986 33.5894C90.546 33.5894 89.3543 34.6883 89.1855 36.1015Z" fill="#EFE0D3"/>
                <path d="M44.5 14H17.5V13.2051C17.5 5.92375 23.556 0 31 0C38.444 0 44.5 5.92375 44.5 13.2051V14ZM19.1489 12.4132H42.8481C42.4299 6.37627 37.2755 1.58972 30.997 1.58972C24.7186 1.58972 19.5641 6.37627 19.146 12.4132" fill="#EFE0D3"/>
                <path d="M39.5 14H22.5V13.2027C22.5 8.67799 26.3136 5 30.9985 5C35.6834 5 39.497 8.6809 39.497 13.2027V14H39.5ZM24.2003 12.4083H37.7997C37.3927 9.13771 34.4986 6.59456 31.0015 6.59456C27.5045 6.59456 24.6103 9.13771 24.2003 12.4083Z" fill="#EFE0D3"/>
                <path d="M35.4805 13.8691H26.4805V13.4262C26.4805 10.9125 28.4995 8.86914 30.9797 8.86914C33.4599 8.86914 35.4789 10.9141 35.4789 13.4262V13.8691H35.4805ZM27.3806 12.9849H34.5803C34.3648 11.1679 32.8327 9.75501 30.9813 9.75501C29.1299 9.75501 27.5977 11.1679 27.3806 12.9849Z" fill="#EFE0D3"/>
              </svg>
            </div>
            <div class="section-title-right">
              <svg xmlns="http://www.w3.org/2000/svg" width="122" height="37" viewBox="0 0 122 37" fill="none">
                <path d="M65.7837 25.1402C62.7203 25.1402 60.4746 22.6335 60.4746 19.5701C60.4746 16.5068 62.7182 14 65.7837 14" stroke="#EFE0D3" stroke-linejoin="round"/>
                <path d="M66.4746 36.2809C69.538 36.2809 71.7837 33.7741 71.7837 30.7108C71.7837 27.6474 69.5401 25.1406 66.4746 25.1406" stroke="#EFE0D3" stroke-linejoin="round"/>
                <path d="M0 36.2801L70.8484 36.2805C73.9117 36.2805 76.4185 33.7737 76.4185 30.7104C76.4185 27.647 73.9117 25.1402 70.8484 25.1402H63.2832H69.4181H61.8529C58.7896 25.1402 56.2828 22.6335 56.2828 19.5701C56.2828 16.5068 58.7896 14 61.8529 14L121.283 14" stroke="#EFE0D3" stroke-linejoin="round"/>
                <path d="M18.7832 36.8879H39.7832V36.2697C39.7832 30.6064 35.073 25.999 29.2832 25.999C23.4934 25.999 18.7832 30.6064 18.7832 36.2697V36.8879ZM38.5007 35.6537H20.068C20.3933 30.9583 24.4023 27.2355 29.2855 27.2355C34.1687 27.2355 38.1778 30.9583 38.503 35.6537" fill="#EFE0D3"/>
                <path d="M22.6723 36.8894H35.8945V36.2693C35.8945 32.7501 32.9284 29.8894 29.2846 29.8894C25.6408 29.8894 22.6747 32.7523 22.6747 36.2693V36.8894H22.6723ZM34.5721 35.6514H23.9948C24.3113 33.1076 26.5623 31.1296 29.2822 31.1296C32.0022 31.1296 34.2532 33.1076 34.5721 35.6514Z" fill="#EFE0D3"/>
                <path d="M25.7979 36.7893H32.7979V36.4448C32.7979 34.4896 31.2275 32.9004 29.2985 32.9004C27.3694 32.9004 25.7991 34.4909 25.7991 36.4448V36.7893H25.7979ZM32.0977 36.1015H26.498C26.6656 34.6883 27.8573 33.5894 29.2972 33.5894C30.7372 33.5894 31.9289 34.6883 32.0977 36.1015Z" fill="#EFE0D3"/>
                <path d="M76.7832 14H103.783V13.2051C103.783 5.92375 97.7272 0 90.2832 0C82.8392 0 76.7832 5.92375 76.7832 13.2051V14ZM102.134 12.4132H78.4351C78.8533 6.37627 84.0077 1.58972 90.2862 1.58972C96.5646 1.58972 101.719 6.37627 102.137 12.4132" fill="#EFE0D3"/>
                <path d="M81.7832 14H98.7832V13.2027C98.7832 8.67799 94.9696 5 90.2847 5C85.5998 5 81.7862 8.6809 81.7862 13.2027V14H81.7832ZM97.0829 12.4083H83.4835C83.8905 9.13771 86.7846 6.59456 90.2817 6.59456C93.7787 6.59456 96.6729 9.13771 97.0829 12.4083Z" fill="#EFE0D3"/>
                <path d="M85.8027 13.8691H94.8027V13.4262C94.8027 10.9125 92.7837 8.86914 90.3035 8.86914C87.8233 8.86914 85.8043 10.9141 85.8043 13.4262V13.8691H85.8027ZM93.9026 12.9849H86.7029C86.9184 11.1679 88.4505 9.75501 90.3019 9.75501C92.1533 9.75501 93.6855 11.1679 93.9026 12.9849Z" fill="#EFE0D3"/>
              </svg>
            </div>
            <div class="section-title">
              <h2>优秀思政课堂</h2>
              <div class="section-title-icon">
                <img src="/images/xiaohui2.png" alt="" />
              </div>
            </div>
          </div>

          <button class="more-btn" @click="viewMoreExcellent">
            <span>查看更多</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <!-- 课程轮播 -->
        <div class="courses-carousel">
          <button class="carousel-btn carousel-btn--prev" @click="prevSlide">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M20 24L12 16L20 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <div class="courses-carousel__content">
            <!-- 第一行 -->
            <div class="courses-row">
              <div
                v-for="course in excellentCourses.slice(currentSlide * 2, currentSlide * 2 + 2)"
                :key="course.id"
                class="course-card-horizontal"
              >
                <div class="course-card-horizontal__image">
                  <img :src="course.cover" alt="" />
                  <div class="course-card-horizontal__label">{{ course.courseName }}</div>
                </div>
                <div class="course-card-horizontal__content">
                  <div class="course-card-horizontal__header">
                    <h3 class="course-card-horizontal__title">{{ course.title }}</h3>
                    <div class="course-card-horizontal__views">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 7C8.61929 7 7.5 8.11929 7.5 9.5C7.5 10.8807 8.61929 12 10 12C11.3807 12 12.5 10.8807 12.5 9.5C12.5 8.11929 11.3807 7 10 7Z" fill="#333333" fill-opacity="0.5"/>
                        <path d="M10 4.16667C5.83333 4.16667 2.27500 6.73333 0.833336 10.4167C2.27500 14.1 5.83333 16.6667 10 16.6667C14.1667 16.6667 17.725 14.1 19.1667 10.4167C17.725 6.73333 14.1667 4.16667 10 4.16667ZM10 14.5C7.51667 14.5 5.5 12.4833 5.5 10C5.5 7.51667 7.51667 5.5 10 5.5C12.4833 5.5 14.5 7.51667 14.5 10C14.5 12.4833 12.4833 14.5 10 14.5Z" fill="#333333" fill-opacity="0.5"/>
                      </svg>
                      <span>{{ course.views }}人</span>
                    </div>
                  </div>
                  <p class="course-card-horizontal__description">{{ course.description }}</p>
                  <div class="course-card-horizontal__meta">
                    <span>课程名称：{{ course.courseName }}</span>
                  </div>
                  <div class="course-card-horizontal__meta">
                    <span>授课教师：{{ course.teacher }}</span>
                  </div>
                  <div class="course-card-horizontal__meta">
                    <span>授课时间：{{ course.semester }}</span>
                  </div>
                  <div class="course-card-horizontal__meta">
                    <span>推荐督导员：{{ course.supervisor }}</span>
                  </div>
                  <div class="course-card-horizontal__meta">
                    <span>发布时间：{{ course.publishTime }}</span>
                  </div>
                  <button class="course-card-horizontal__watch-btn" @click="watchCourse(course)">
                    观看
                  </button>
                </div>
              </div>
            </div>

            <!-- 第二行 -->
            <div class="courses-row">
              <div
                v-for="course in excellentCourses.slice(currentSlide * 2 + 2, currentSlide * 2 + 4)"
                :key="course.id"
                class="course-card-horizontal"
              >
                <div class="course-card-horizontal__image">
                  <img :src="course.cover" alt="" />
                  <div class="course-card-horizontal__label">{{ course.courseName }}</div>
                </div>
                <div class="course-card-horizontal__content">
                  <div class="course-card-horizontal__header">
                    <h3 class="course-card-horizontal__title">{{ course.title }}</h3>
                    <div class="course-card-horizontal__views">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 7C8.61929 7 7.5 8.11929 7.5 9.5C7.5 10.8807 8.61929 12 10 12C11.3807 12 12.5 10.8807 12.5 9.5C12.5 8.11929 11.3807 7 10 7Z" fill="#333333" fill-opacity="0.5"/>
                        <path d="M10 4.16667C5.83333 4.16667 2.27500 6.73333 0.833336 10.4167C2.27500 14.1 5.83333 16.6667 10 16.6667C14.1667 16.6667 17.725 14.1 19.1667 10.4167C17.725 6.73333 14.1667 4.16667 10 4.16667ZM10 14.5C7.51667 14.5 5.5 12.4833 5.5 10C5.5 7.51667 7.51667 5.5 10 5.5C12.4833 5.5 14.5 7.51667 14.5 10C14.5 12.4833 12.4833 14.5 10 14.5Z" fill="#333333" fill-opacity="0.5"/>
                      </svg>
                      <span>{{ course.views }}人</span>
                    </div>
                  </div>
                  <p class="course-card-horizontal__description">{{ course.description }}</p>
                  <div class="course-card-horizontal__meta">
                    <span>授课老师：{{ course.teacher }}</span>
                  </div>
                  <div class="course-card-horizontal__meta">
                    <span>推荐督导员：{{ course.supervisor }}</span>
                  </div>
                  <div class="course-card-horizontal__meta">
                    <span>授课时间：{{ course.semester }}</span>
                  </div>
                  <div class="course-card-horizontal__meta">
                    <span>学院：{{ course.college }}</span>
                  </div>
                  <div class="course-card-horizontal__meta">
                    <span>发布时间：{{ course.publishTime }}</span>
                  </div>
                  <button class="course-card-horizontal__watch-btn" @click="watchCourse(course)">
                    观看
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button class="carousel-btn carousel-btn--next" @click="nextSlide">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M12 24L20 16L12 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- "一院一品"专题区块 -->
    <section class="college-special">
      <div class="college-special__container">
        <div class="section-header">
          <button class="more-btn" style="opacity: 0;">
            <span>查看更多</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="#333333" stroke-opacity="0.7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <div class="section-title-wrapper">
            <div class="section-title-bg">
              <img src="/images/xiaohui1.png" alt="" />
            </div>
            <div class="section-title-left">
              <svg xmlns="http://www.w3.org/2000/svg" width="122" height="37" viewBox="0 0 122 37" fill="none">
                <path d="M55.4995 25.1402C58.5629 25.1402 60.8086 22.6335 60.8086 19.5701C60.8086 16.5068 58.565 14 55.4995 14" stroke="#BC2220" stroke-linejoin="round"/>
                <path d="M54.8086 36.2809C51.7452 36.2809 49.4995 33.7741 49.4995 30.7108C49.4995 27.6474 51.7431 25.1406 54.8086 25.1406" stroke="#BC2220" stroke-linejoin="round"/>
                <path d="M121.283 36.2801L50.4349 36.2805C47.3715 36.2805 44.8647 33.7737 44.8647 30.7104C44.8647 27.647 47.3715 25.1402 50.4349 25.1402H58H51.8651H59.4303C62.4936 25.1402 65.0004 22.6335 65.0004 19.5701C65.0004 16.5068 62.4936 14 59.4303 14L0 14" stroke="#BC2220" stroke-linejoin="round"/>
                <path d="M102.5 36.8879H81.5V36.2697C81.5 30.6064 86.2102 25.999 92 25.999C97.7898 25.999 102.5 30.6064 102.5 36.2697V36.8879ZM82.7825 35.6537H101.215C100.89 30.9583 96.8809 27.2355 91.9977 27.2355C87.1145 27.2355 83.1054 30.9583 82.7802 35.6537" fill="#BC2220"/>
                <path d="M98.6109 36.8894H85.3887V36.2693C85.3887 32.7501 88.3548 29.8894 91.9986 29.8894C95.6424 29.8894 98.6085 32.7523 98.6085 36.2693V36.8894H98.6109ZM86.7111 35.6514H97.2884C96.9719 33.1076 94.7209 31.1296 92.001 31.1296C89.281 31.1296 87.03 33.1076 86.7111 35.6514Z" fill="#BC2220"/>
                <path d="M95.4854 36.7893H88.4854V36.4448C88.4854 34.4896 90.0557 32.9004 91.9847 32.9004C93.9138 32.9004 95.4841 34.4909 95.4841 36.4448V36.7893H95.4854ZM89.1855 36.1015H94.7852C94.6176 34.6883 93.426 33.5894 91.986 33.5894C90.546 33.5894 89.3543 34.6883 89.1855 36.1015Z" fill="#BC2220"/>
                <path d="M44.5 14H17.5V13.2051C17.5 5.92375 23.556 0 31 0C38.444 0 44.5 5.92375 44.5 13.2051V14ZM19.1489 12.4132H42.8481C42.4299 6.37627 37.2755 1.58972 30.997 1.58972C24.7186 1.58972 19.5641 6.37627 19.146 12.4132" fill="#BC2220"/>
                <path d="M39.5 14H22.5V13.2027C22.5 8.67799 26.3136 5 30.9985 5C35.6834 5 39.497 8.6809 39.497 13.2027V14H39.5ZM24.2003 12.4083H37.7997C37.3927 9.13771 34.4986 6.59456 31.0015 6.59456C27.5045 6.59456 24.6103 9.13771 24.2003 12.4083Z" fill="#BC2220"/>
                <path d="M35.4805 13.8691H26.4805V13.4262C26.4805 10.9125 28.4995 8.86914 30.9797 8.86914C33.4599 8.86914 35.4789 10.9141 35.4789 13.4262V13.8691H35.4805ZM27.3806 12.9849H34.5803C34.3648 11.1679 32.8327 9.75501 30.9813 9.75501C29.1299 9.75501 27.5977 11.1679 27.3806 12.9849Z" fill="#BC2220"/>
              </svg>
            </div>
            <div class="section-title-right">
              <svg xmlns="http://www.w3.org/2000/svg" width="122" height="37" viewBox="0 0 122 37" fill="none">
                <path d="M65.7837 25.1402C62.7203 25.1402 60.4746 22.6335 60.4746 19.5701C60.4746 16.5068 62.7182 14 65.7837 14" stroke="#BC2220" stroke-linejoin="round"/>
                <path d="M66.4746 36.2809C69.538 36.2809 71.7837 33.7741 71.7837 30.7108C71.7837 27.6474 69.5401 25.1406 66.4746 25.1406" stroke="#BC2220" stroke-linejoin="round"/>
                <path d="M0 36.2801L70.8484 36.2805C73.9117 36.2805 76.4185 33.7737 76.4185 30.7104C76.4185 27.647 73.9117 25.1402 70.8484 25.1402H63.2832H69.4181H61.8529C58.7896 25.1402 56.2828 22.6335 56.2828 19.5701C56.2828 16.5068 58.7896 14 61.8529 14L121.283 14" stroke="#BC2220" stroke-linejoin="round"/>
                <path d="M18.7832 36.8879H39.7832V36.2697C39.7832 30.6064 35.073 25.999 29.2832 25.999C23.4934 25.999 18.7832 30.6064 18.7832 36.2697V36.8879ZM38.5007 35.6537H20.068C20.3933 30.9583 24.4023 27.2355 29.2855 27.2355C34.1687 27.2355 38.1778 30.9583 38.503 35.6537" fill="#BC2220"/>
                <path d="M22.6723 36.8894H35.8945V36.2693C35.8945 32.7501 32.9284 29.8894 29.2846 29.8894C25.6408 29.8894 22.6747 32.7523 22.6747 36.2693V36.8894H22.6723ZM34.5721 35.6514H23.9948C24.3113 33.1076 26.5623 31.1296 29.2822 31.1296C32.0022 31.1296 34.2532 33.1076 34.5721 35.6514Z" fill="#BC2220"/>
                <path d="M25.7979 36.7893H32.7979V36.4448C32.7979 34.4896 31.2275 32.9004 29.2985 32.9004C27.3694 32.9004 25.7991 34.4909 25.7991 36.4448V36.7893H25.7979ZM32.0977 36.1015H26.498C26.6656 34.6883 27.8573 33.5894 29.2972 33.5894C30.7372 33.5894 31.9289 34.6883 32.0977 36.1015Z" fill="#BC2220"/>
                <path d="M76.7832 14H103.783V13.2051C103.783 5.92375 97.7272 0 90.2832 0C82.8392 0 76.7832 5.92375 76.7832 13.2051V14ZM102.134 12.4132H78.4351C78.8533 6.37627 84.0077 1.58972 90.2862 1.58972C96.5646 1.58972 101.719 6.37627 102.137 12.4132" fill="#BC2220"/>
                <path d="M81.7832 14H98.7832V13.2027C98.7832 8.67799 94.9696 5 90.2847 5C85.5998 5 81.7862 8.6809 81.7862 13.2027V14H81.7832ZM97.0829 12.4083H83.4835C83.8905 9.13771 86.7846 6.59456 90.2817 6.59456C93.7787 6.59456 96.6729 9.13771 97.0829 12.4083Z" fill="#BC2220"/>
                <path d="M85.8027 13.8691H94.8027V13.4262C94.8027 10.9125 92.7837 8.86914 90.3035 8.86914C87.8233 8.86914 85.8043 10.9141 85.8043 13.4262V13.8691H85.8027ZM93.9026 12.9849H86.7029C86.9184 11.1679 88.4505 9.75501 90.3019 9.75501C92.1533 9.75501 93.6855 11.1679 93.9026 12.9849Z" fill="#BC2220"/>
              </svg>
            </div>
            <div class="section-title">
              <h2>"一院一品"专题</h2>
              <div class="section-title-icon">
                <img src="/images/xiaohui2.png" alt="" />
              </div>
            </div>
          </div>

          <button class="more-btn" @click="viewMoreCollege">
            <span>查看更多</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="#333333" stroke-opacity="0.7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <!-- 课程网格 -->
        <div class="courses-grid">
          <div
            v-for="course in collegeCourses.slice(0, 4)"
            :key="course.id"
            class="course-card-vertical"
            @click="viewCourseDetail(course)"
          >
            <div class="course-card-vertical__image">
              <img :src="course.cover" alt="" />
              <div class="course-card-vertical__label">{{ course.college }}</div>
            </div>
            <div class="course-card-vertical__content">
              <h3 class="course-card-vertical__title">{{ course.title }}</h3>
              <div class="course-card-vertical__meta">
                <span>教师：{{ course.teacher }}</span>
                <div class="course-card-vertical__views">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 7C8.61929 7 7.5 8.11929 7.5 9.5C7.5 10.8807 8.61929 12 10 12C11.3807 12 12.5 10.8807 12.5 9.5C12.5 8.11929 11.3807 7 10 7Z" fill="#333333" fill-opacity="0.5"/>
                    <path d="M10 4.16667C5.83333 4.16667 2.27500 6.73333 0.833336 10.4167C2.27500 14.1 5.83333 16.6667 10 16.6667C14.1667 16.6667 17.725 14.1 19.1667 10.4167C17.725 6.73333 14.1667 4.16667 10 4.16667ZM10 14.5C7.51667 14.5 5.5 12.4833 5.5 10C5.5 7.51667 7.51667 5.5 10 5.5C12.4833 5.5 14.5 7.51667 14.5 10C14.5 12.4833 12.4833 14.5 10 14.5Z" fill="#333333" fill-opacity="0.5"/>
                  </svg>
                  <span>{{ course.views }}人</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="courses-grid">
          <div
            v-for="course in collegeCourses.slice(4, 8)"
            :key="course.id"
            class="course-card-vertical"
            @click="viewCourseDetail(course)"
          >
            <div class="course-card-vertical__image">
              <img :src="course.cover" alt="" />
              <div class="course-card-vertical__label">{{ course.college }}</div>
            </div>
            <div class="course-card-vertical__content">
              <h3 class="course-card-vertical__title">{{ course.title }}</h3>
              <div class="course-card-vertical__meta">
                <span>教师：{{ course.teacher }}</span>
                <div class="course-card-vertical__views">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 7C8.61929 7 7.5 8.11929 7.5 9.5C7.5 10.8807 8.61929 12 10 12C11.3807 12 12.5 10.8807 12.5 9.5C12.5 8.11929 11.3807 7 10 7Z" fill="#333333" fill-opacity="0.5"/>
                    <path d="M10 4.16667C5.83333 4.16667 2.27500 6.73333 0.833336 10.4167C2.27500 14.1 5.83333 16.6667 10 16.6667C14.1667 16.6667 17.725 14.1 19.1667 10.4167C17.725 6.73333 14.1667 4.16667 10 4.16667ZM10 14.5C7.51667 14.5 5.5 12.4833 5.5 10C5.5 7.51667 7.51667 5.5 10 5.5C12.4833 5.5 14.5 7.51667 14.5 10C14.5 12.4833 12.4833 14.5 10 14.5Z" fill="#333333" fill-opacity="0.5"/>
                  </svg>
                  <span>{{ course.views }}人</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 红色文化资源地图区块 -->
    <section class="culture-map">
      <div class="culture-map__container">
        <div class="section-header">
          <button class="more-btn" style="opacity: 0;">
            <span>查看更多</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="#333333" stroke-opacity="0.7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <div class="section-title-wrapper">
            <div class="section-title-bg">
              <img src="/images/xiaohui1.png" alt="" />
            </div>
            <div class="section-title-left">
              <svg xmlns="http://www.w3.org/2000/svg" width="122" height="37" viewBox="0 0 122 37" fill="none">
                <path d="M55.4995 25.1402C58.5629 25.1402 60.8086 22.6335 60.8086 19.5701C60.8086 16.5068 58.565 14 55.4995 14" stroke="#BC2220" stroke-linejoin="round"/>
                <path d="M54.8086 36.2809C51.7452 36.2809 49.4995 33.7741 49.4995 30.7108C49.4995 27.6474 51.7431 25.1406 54.8086 25.1406" stroke="#BC2220" stroke-linejoin="round"/>
                <path d="M121.283 36.2801L50.4349 36.2805C47.3715 36.2805 44.8647 33.7737 44.8647 30.7104C44.8647 27.647 47.3715 25.1402 50.4349 25.1402H58H51.8651H59.4303C62.4936 25.1402 65.0004 22.6335 65.0004 19.5701C65.0004 16.5068 62.4936 14 59.4303 14L0 14" stroke="#BC2220" stroke-linejoin="round"/>
                <path d="M102.5 36.8879H81.5V36.2697C81.5 30.6064 86.2102 25.999 92 25.999C97.7898 25.999 102.5 30.6064 102.5 36.2697V36.8879ZM82.7825 35.6537H101.215C100.89 30.9583 96.8809 27.2355 91.9977 27.2355C87.1145 27.2355 83.1054 30.9583 82.7802 35.6537" fill="#BC2220"/>
                <path d="M98.6109 36.8894H85.3887V36.2693C85.3887 32.7501 88.3548 29.8894 91.9986 29.8894C95.6424 29.8894 98.6085 32.7523 98.6085 36.2693V36.8894H98.6109ZM86.7111 35.6514H97.2884C96.9719 33.1076 94.7209 31.1296 92.001 31.1296C89.281 31.1296 87.03 33.1076 86.7111 35.6514Z" fill="#BC2220"/>
                <path d="M95.4854 36.7893H88.4854V36.4448C88.4854 34.4896 90.0557 32.9004 91.9847 32.9004C93.9138 32.9004 95.4841 34.4909 95.4841 36.4448V36.7893H95.4854ZM89.1855 36.1015H94.7852C94.6176 34.6883 93.426 33.5894 91.986 33.5894C90.546 33.5894 89.3543 34.6883 89.1855 36.1015Z" fill="#BC2220"/>
                <path d="M44.5 14H17.5V13.2051C17.5 5.92375 23.556 0 31 0C38.444 0 44.5 5.92375 44.5 13.2051V14ZM19.1489 12.4132H42.8481C42.4299 6.37627 37.2755 1.58972 30.997 1.58972C24.7186 1.58972 19.5641 6.37627 19.146 12.4132" fill="#BC2220"/>
                <path d="M39.5 14H22.5V13.2027C22.5 8.67799 26.3136 5 30.9985 5C35.6834 5 39.497 8.6809 39.497 13.2027V14H39.5ZM24.2003 12.4083H37.7997C37.3927 9.13771 34.4986 6.59456 31.0015 6.59456C27.5045 6.59456 24.6103 9.13771 24.2003 12.4083Z" fill="#BC2220"/>
                <path d="M35.4805 13.8691H26.4805V13.4262C26.4805 10.9125 28.4995 8.86914 30.9797 8.86914C33.4599 8.86914 35.4789 10.9141 35.4789 13.4262V13.8691H35.4805ZM27.3806 12.9849H34.5803C34.3648 11.1679 32.8327 9.75501 30.9813 9.75501C29.1299 9.75501 27.5977 11.1679 27.3806 12.9849Z" fill="#BC2220"/>
              </svg>
            </div>
            <div class="section-title-right">
              <svg xmlns="http://www.w3.org/2000/svg" width="122" height="37" viewBox="0 0 122 37" fill="none">
                <path d="M65.7837 25.1402C62.7203 25.1402 60.4746 22.6335 60.4746 19.5701C60.4746 16.5068 62.7182 14 65.7837 14" stroke="#BC2220" stroke-linejoin="round"/>
                <path d="M66.4746 36.2809C69.538 36.2809 71.7837 33.7741 71.7837 30.7108C71.7837 27.6474 69.5401 25.1406 66.4746 25.1406" stroke="#BC2220" stroke-linejoin="round"/>
                <path d="M0 36.2801L70.8484 36.2805C73.9117 36.2805 76.4185 33.7737 76.4185 30.7104C76.4185 27.647 73.9117 25.1402 70.8484 25.1402H63.2832H69.4181H61.8529C58.7896 25.1402 56.2828 22.6335 56.2828 19.5701C56.2828 16.5068 58.7896 14 61.8529 14L121.283 14" stroke="#BC2220" stroke-linejoin="round"/>
                <path d="M18.7832 36.8879H39.7832V36.2697C39.7832 30.6064 35.073 25.999 29.2832 25.999C23.4934 25.999 18.7832 30.6064 18.7832 36.2697V36.8879ZM38.5007 35.6537H20.068C20.3933 30.9583 24.4023 27.2355 29.2855 27.2355C34.1687 27.2355 38.1778 30.9583 38.503 35.6537" fill="#BC2220"/>
                <path d="M22.6723 36.8894H35.8945V36.2693C35.8945 32.7501 32.9284 29.8894 29.2846 29.8894C25.6408 29.8894 22.6747 32.7523 22.6747 36.2693V36.8894H22.6723ZM34.5721 35.6514H23.9948C24.3113 33.1076 26.5623 31.1296 29.2822 31.1296C32.0022 31.1296 34.2532 33.1076 34.5721 35.6514Z" fill="#BC2220"/>
                <path d="M25.7979 36.7893H32.7979V36.4448C32.7979 34.4896 31.2275 32.9004 29.2985 32.9004C27.3694 32.9004 25.7991 34.4909 25.7991 36.4448V36.7893H25.7979ZM32.0977 36.1015H26.498C26.6656 34.6883 27.8573 33.5894 29.2972 33.5894C30.7372 33.5894 31.9289 34.6883 32.0977 36.1015Z" fill="#BC2220"/>
                <path d="M76.7832 14H103.783V13.2051C103.783 5.92375 97.7272 0 90.2832 0C82.8392 0 76.7832 5.92375 76.7832 13.2051V14ZM102.134 12.4132H78.4351C78.8533 6.37627 84.0077 1.58972 90.2862 1.58972C96.5646 1.58972 101.719 6.37627 102.137 12.4132" fill="#BC2220"/>
                <path d="M81.7832 14H98.7832V13.2027C98.7832 8.67799 94.9696 5 90.2847 5C85.5998 5 81.7862 8.6809 81.7862 13.2027V14H81.7832ZM97.0829 12.4083H83.4835C83.8905 9.13771 86.7846 6.59456 90.2817 6.59456C93.7787 6.59456 96.6729 9.13771 97.0829 12.4083Z" fill="#BC2220"/>
                <path d="M85.8027 13.8691H94.8027V13.4262C94.8027 10.9125 92.7837 8.86914 90.3035 8.86914C87.8233 8.86914 85.8043 10.9141 85.8043 13.4262V13.8691H85.8027ZM93.9026 12.9849H86.7029C86.9184 11.1679 88.4505 9.75501 90.3019 9.75501C92.1533 9.75501 93.6855 11.1679 93.9026 12.9849Z" fill="#BC2220"/>
              </svg>
            </div>
            <div class="section-title">
              <h2>红色文化资源地图（福州地区）</h2>
              <div class="section-title-icon">
                <img src="/images/xiaohui2.png" alt="" />
              </div>
            </div>
          </div>

          <button class="more-btn" style="opacity: 0;">
            <span>查看更多</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="#333333" stroke-opacity="0.7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <!-- 地图和列表 -->
        <div class="culture-map__content">
          <!-- 左侧资源列表 -->
          <div class="culture-map__list">
            <div class="culture-map__list-header">
              <div class="culture-map__list-title">
                <h3>文化资源列表</h3>
              </div>
              <div class="culture-map__search">
                <div class="culture-map__search-input">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="#333333" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M17.5 17.5L13.875 13.875" stroke="#333333" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="请输入"
                  />
                </div>
                <button class="culture-map__search-btn" @click="handleSearch">搜索</button>
              </div>
            </div>

            <div class="culture-map__list-content">
              <div
                v-for="(resource, index) in cultureResources"
                :key="resource.id"
                class="culture-resource-item"
                :class="{ 'culture-resource-item--active': index === 0 }"
                @click="selectResource(resource)"
              >
                <div class="culture-resource-item__image">
                  <img :src="resource.cover" alt="" />
                </div>
                <div class="culture-resource-item__content">
                  <div class="culture-resource-item__header">
                    <span class="culture-resource-item__name">{{ resource.name }}</span>
                    <span class="culture-resource-item__type">{{ resource.type }}</span>
                  </div>
                  <p class="culture-resource-item__description">{{ resource.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 右侧地图 -->
          <div class="culture-map__map">
            <img src="/images/indexBg.png" alt="福州地区红色文化资源地图" class="culture-map__map-image" />
            
            <!-- 地图标记点示例 -->
            <div class="map-marker" style="top: 22%; left: 51%;">
              <div class="map-marker__label">展厅地址</div>
              <div class="map-marker__icon">
                <img src="/images/zhuzi2.png" alt="" />
              </div>
            </div>

            <div class="map-marker" style="top: 41%; left: 65%;">
              <div class="map-marker__label">展厅地址</div>
              <div class="map-marker__icon">
                <img src="/images/zhuzi2.png" alt="" />
              </div>
            </div>

            <!-- 详情卡片 -->
            <div class="map-detail-card" style="bottom: 16px; right: 16px;">
              <div class="map-detail-card__image">
                <img src="/images/home/video-2.jpg" alt="" />
              </div>
              <div class="map-detail-card__content">
                <div class="map-detail-card__header">
                  <span>展厅地址</span>
                  <span class="map-detail-card__type">烈士陵园</span>
                </div>
                <p class="map-detail-card__description">
                  实施特岗计划，充实基层教育师资力量；推动营养改善计划提质，确保孩子们吃得放心开心；大力发展职业教育，让更多农村学子拥有"一技之长"……近年来，贵州省实施整体提升教育水平攻坚行动，不断缩小城乡教育差距，保障农村孩子上好学、能就业。
                </p>
                <div class="map-detail-card__location">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 8.66667C8.73638 8.66667 9.33333 8.06971 9.33333 7.33333C9.33333 6.59695 8.73638 6 8 6C7.26362 6 6.66667 6.59695 6.66667 7.33333C6.66667 8.06971 7.26362 8.66667 8 8.66667Z" stroke="#333333" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8 14C10 11.3333 13.3333 9.07619 13.3333 6.66667C13.3333 3.72115 10.9455 1.33333 8 1.33333C5.05448 1.33333 2.66667 3.72115 2.66667 6.66667C2.66667 9.07619 6 11.3333 8 14Z" stroke="#333333" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>大红门服饰商贸城</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 轮播相关
const currentSlide = ref(0)

const prevSlide = () => {
  currentSlide.value = Math.max(0, currentSlide.value - 1)
}

const nextSlide = () => {
  const maxSlide = Math.ceil(excellentCourses.value.length / 4) - 1
  currentSlide.value = Math.min(maxSlide, currentSlide.value + 1)
}

// 优秀思政课堂数据
const excellentCourses = ref([
  {
    id: '1',
    title: '教学督导表扬的优秀本科课堂第二十四期',
    cover: '/images/home/video-1.jpg',
    courseName: '马克思主义基本原理',
    teacher: '董海峰-副教授',
    semester: '2025年春季学期',
    supervisor: '戴力芬',
    publishTime: '2025-12-11',
    views: 3456,
    description: '高校军事理论课肩负着传承军事智慧，培育国防素养的重要使命，是提升当代大学生国防观念，增强民族自豪感的重要途径。本期教学督导表扬的优秀课堂授课教师，在课堂教学中大胆改革与创新，将AI技术融入教学实践，实现课堂"赋能"。她通过动态问题链激发学生探索兴趣，'
  },
  {
    id: '2',
    title: '教学督导表扬的优秀本科课堂第二十四期',
    cover: '/images/home/video-2.jpg',
    courseName: '军事理论',
    teacher: '吴美川',
    supervisor: '吴美川',
    semester: '2025年春季学期',
    college: '信息学院',
    publishTime: '2025-12-11 12:00',
    views: 3456,
    description: '高校军事理论课肩负着传承军事智慧，培育国防素养的重要使命，是提升当代大学生国防观念，增强民族自豪感的重要途径。本期教学督导表扬的优秀课堂授课教师，在课堂教学中大胆改革与创新，将AI技术融入教学实践，实现课堂"赋能"。她通过动态问题链激发学生探索兴趣，'
  },
  {
    id: '3',
    title: '教学督导表扬的优秀本科课堂第二十四期',
    cover: '/images/home/video-1.jpg',
    courseName: '这里是课程名称',
    teacher: '吴美川',
    supervisor: '吴美川',
    semester: '2025年春季学期',
    college: '信息学院',
    publishTime: '2025-12-11 12:00',
    views: 3456,
    description: '高校军事理论课肩负着传承军事智慧，培育国防素养的重要使命，是提升当代大学生国防观念，增强民族自豪感的重要途径。本期教学督导表扬的优秀课堂授课教师，在课堂教学中大胆改革与创新，将AI技术融入教学实践，实现课堂"赋能"。她通过动态问题链激发学生探索兴趣，'
  },
  {
    id: '4',
    title: '教学督导表扬的优秀本科课堂第二十四期',
    cover: '/images/home/video-2.jpg',
    courseName: '军事理论',
    teacher: '吴美川',
    supervisor: '吴美川',
    semester: '2025年春季学期',
    college: '信息学院',
    publishTime: '2025-12-11 12:00',
    views: 3456,
    description: '高校军事理论课肩负着传承军事智慧，培育国防素养的重要使命，是提升当代大学生国防观念，增强民族自豪感的重要途径。本期教学督导表扬的优秀课堂授课教师，在课堂教学中大胆改革与创新，将AI技术融入教学实践，实现课堂"赋能"。她通过动态问题链激发学生探索兴趣，'
  }
])

// "一院一品"专题数据
const collegeCourses = ref([
  {
    id: '1',
    title: '概率论与数理统计',
    cover: '/images/home/video-1.jpg',
    college: '电气工程与自动学院',
    teacher: '刘丽军',
    views: 3456
  },
  {
    id: '2',
    title: '概率论与数理统计',
    cover: '/images/home/video-2.jpg',
    college: '电气工程与自动学院',
    teacher: '刘丽军',
    views: 3456
  },
  {
    id: '3',
    title: '概率论与数理统计',
    cover: '/images/home/video-3.jpg',
    college: '电气工程与自动学院',
    teacher: '刘丽军',
    views: 3456
  },
  {
    id: '4',
    title: '概率论与数理统计',
    cover: '/images/home/video-4.jpg',
    college: '电气工程与自动学院',
    teacher: '刘丽军',
    views: 3456
  },
  {
    id: '5',
    title: '概率论与数理统计',
    cover: '/images/home/video-1.jpg',
    college: '电气工程与自动学院',
    teacher: '刘丽军',
    views: 3456
  },
  {
    id: '6',
    title: '概率论与数理统计',
    cover: '/images/home/video-2.jpg',
    college: '电气工程与自动学院',
    teacher: '刘丽军',
    views: 3456
  },
  {
    id: '7',
    title: '概率论与数理统计',
    cover: '/images/home/video-3.jpg',
    college: '电气工程与自动学院',
    teacher: '刘丽军',
    views: 3456
  },
  {
    id: '8',
    title: '概率论与数理统计',
    cover: '/images/home/video-4.jpg',
    college: '电气工程与自动学院',
    teacher: '刘丽军',
    views: 3456
  }
])

// 红色文化资源数据
const cultureResources = ref([
  {
    id: '1',
    name: '文化遗址',
    type: '博物馆',
    cover: '/images/indexBg.png',
    description: '热到融化的马路、无穷无尽的野火'
  },
  {
    id: '2',
    name: '文化遗址',
    type: '人物故居',
    cover: '/images/indexBg.png',
    description: '热到融化的马路、无穷无尽的野火'
  },
  {
    id: '3',
    name: '文化遗址',
    type: '烈士陵园',
    cover: '/images/indexBg.png',
    description: '热到融化的马路、无穷无尽的野火'
  },
  {
    id: '4',
    name: '文化遗址',
    type: '党校',
    cover: '/images/indexBg.png',
    description: '热到融化的马路、无穷无尽的野火'
  },
  {
    id: '5',
    name: '文化遗址',
    type: '党群中心',
    cover: '/images/indexBg.png',
    description: '热到融化的马路、无穷无尽的野火'
  },
  {
    id: '6',
    name: '文化遗址',
    type: '纪念馆',
    cover: '/images/indexBg.png',
    description: '热到融化的马路、无穷无尽的野火'
  },
  {
    id: '7',
    name: '文化遗址',
    type: '革命地址',
    cover: '/images/indexBg.png',
    description: '热到融化的马路、无穷无尽的野火'
  }
])

// 搜索相关
const searchQuery = ref('')

const handleSearch = () => {
  console.log('搜索:', searchQuery.value)
}

// 点击事件
const viewMoreExcellent = () => {
  console.log('查看更多优秀思政课堂')
}

const viewMoreCollege = () => {
  console.log('查看更多一院一品专题')
}

const watchCourse = (course: any) => {
  console.log('观看课程:', course)
  router.push(`/study/video/${course.id}`)
}

const viewCourseDetail = (course: any) => {
  console.log('查看课程详情:', course)
  router.push(`/study/${course.id}`)
}

const selectResource = (resource: any) => {
  console.log('选择资源:', resource)
}
</script>

<style scoped>
.study-page {
  width: 100%;
  min-height: 100vh;
  background: #fff9ed;
  position: relative;
  overflow-x: hidden;
}

.study-bg {
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  height: 1080px;
  background-image: url('/images/indexBg.png');
  background-size: cover;
  background-position: center;
  opacity: 0.1;
  pointer-events: none;
  z-index: 0;
}

/* ===== 优秀思政课堂区块 ===== */
.excellent-courses {
  position: relative;
  width: 100%;
  padding-top: 32px;
  padding-bottom: 64px;
  margin-bottom: 96px;
  z-index: 1;
}

.excellent-courses::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1000px;
  background: #9c090a;
  z-index: -2;
}

.excellent-courses::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1000px;
  background: linear-gradient(180deg, #a40a0b 0%, #9c090a 100%);
  z-index: -1;
}

.excellent-courses__container {
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 160px;
  display: flex;
  flex-direction: column;
  gap: 96px;
  width: 100%;
  box-sizing: border-box;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 78px;
  position: relative;
}

.section-title-wrapper {
  position: relative;
  width: 306.566px;
  height: 78px;
}

.section-title-bg {
  position: absolute;
  top: 0;
  left: 42.08%;
  right: 42.26%;
  aspect-ratio: 1;
  opacity: 0.2;
}

.section-title-bg img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.section-title-left {
  position: absolute;
  bottom: 21.94%;
  left: 0;
  right: 60.44%;
  top: 30.77%;
}

.section-title-left svg {
  width: 100%;
  height: 100%;
}

.section-title-right {
  position: absolute;
  bottom: 21.94%;
  left: 60.44%;
  right: 0;
  top: 30.77%;
}

.section-title-right svg {
  width: 100%;
  height: 100%;
}

.section-title {
  position: absolute;
  bottom: 0;
  left: 39.56%;
  right: 39.56%;
  top: calc(50% + 12px);
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-title h2 {
  margin: 0;
  font-size: 24px;
  font-family: 'Source Han Serif CN', serif;
  font-weight: 700;
  color: #efe0d3;
  line-height: normal;
  white-space: nowrap;
}

.excellent-courses .section-title h2 {
  color: #efe0d3;
}

.college-special .section-title h2,
.culture-map .section-title h2 {
  color: #bc2220;
  letter-spacing: 3.84px;
}

.section-title-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-title-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.more-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.3s ease;
}

.more-btn:hover {
  opacity: 0.7 !important;
}

.more-btn span {
  font-size: 16px;
  font-family: 'Source Han Sans CN', sans-serif;
  font-weight: 400;
  color: white;
  line-height: normal;
}

.excellent-courses .more-btn span {
  color: white;
}

.college-special .more-btn span,
.culture-map .more-btn span {
  color: #333;
  opacity: 0.7;
}

/* 课程轮播 */
.courses-carousel {
  display: flex;
  align-items: center;
  gap: 48px;
  position: relative;
  width: 100%;
}

.carousel-btn {
  flex-shrink: 0;
  width: 48px;
  padding: 48px 8px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-btn:hover {
  background: rgba(0, 0, 0, 0.7);
}

.carousel-btn--prev svg {
  transform: scaleX(-1);
}

.courses-carousel__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.courses-row {
  display: flex;
  gap: 48px;
}

/* 横向课程卡片 */
.course-card-horizontal {
  flex: 1;
  display: flex;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.course-card-horizontal:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.course-card-horizontal__image {
  width: 240px;
  flex-shrink: 0;
  position: relative;
  background: #d9d9d9;
}

.course-card-horizontal__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.course-card-horizontal__label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 14px;
  text-align: center;
}

.course-card-horizontal__content {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
}

.course-card-horizontal__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
}

.course-card-horizontal__title {
  flex: 1;
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: #333;
  line-height: 1.4;
}

.course-card-horizontal__views {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  opacity: 0.5;
}

.course-card-horizontal__views span {
  font-size: 14px;
  color: #333;
}

.course-card-horizontal__description {
  flex: 1;
  margin: 0;
  font-size: 14px;
  color: #333;
  opacity: 0.5;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.course-card-horizontal__meta {
  font-size: 14px;
  color: #333;
}

.course-card-horizontal__watch-btn {
  position: absolute;
  right: 16px;
  bottom: 16px;
  padding: 12px 48px;
  background: #bc2220;
  color: white;
  border: none;
  border-radius: 100px;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.course-card-horizontal__watch-btn:hover {
  transform: scale(1.05);
}

/* ===== "一院一品"专题区块 ===== */
.college-special {
  position: relative;
  padding: 96px 160px;
  z-index: 1;
}

.college-special__container {
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 96px;
}

.courses-grid {
  display: flex;
  gap: 48px;
}

/* 纵向课程卡片 */
.course-card-vertical {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 319px;
}

.course-card-vertical:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.course-card-vertical__image {
  width: 100%;
  height: 200px;
  position: relative;
  background: #d9d9d9;
}

.course-card-vertical__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.course-card-vertical__label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 14px;
}

.course-card-vertical__content {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.course-card-vertical__title {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: #333;
  line-height: 1.4;
}

.course-card-vertical__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #333;
  opacity: 0.5;
}

.course-card-vertical__views {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* ===== 红色文化资源地图区块 ===== */
.culture-map {
  position: relative;
  padding: 0 160px 98px;
  z-index: 1;
}

.culture-map__container {
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.culture-map__content {
  display: flex;
  gap: 16px;
  height: 800px;
}

/* 资源列表 */
.culture-map__list {
  width: 365px;
  flex-shrink: 0;
  border: 1px solid #fdd4a6;
  border-radius: 16px;
  background: linear-gradient(90deg, #ecd9ba 0%, #ecd9ba 100%);
  display: flex;
  flex-direction: column;
  padding: 16px 0;
}

.culture-map__list-header {
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;
}

.culture-map__list-title {
  text-align: center;
}

.culture-map__list-title h3 {
  margin: 0;
  padding: 20px 0;
  font-size: 24px;
  font-weight: 700;
  color: #bc2220;
  position: relative;
}

.culture-map__list-title h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: #bc2220;
}

.culture-map__search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  border-radius: 100px;
  padding: 8px 16px;
}

.culture-map__search-input {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0.5;
}

.culture-map__search-input input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 18px;
  color: #333;
}

.culture-map__search-input input::placeholder {
  color: #333;
  opacity: 1;
}

.culture-map__search-btn {
  background: transparent;
  border: none;
  color: #d50100;
  font-size: 18px;
  cursor: pointer;
}

.culture-map__list-content {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 文化资源列表项 */
.culture-resource-item {
  display: flex;
  gap: 16px;
  padding: 12px 24px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.culture-resource-item--active {
  background: rgba(188, 34, 32, 0.1);
  border-left: 2px solid #bc2220;
  border-right: 2px solid #bc2220;
}

.culture-resource-item:hover {
  background: rgba(188, 34, 32, 0.05);
}

.culture-resource-item__image {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  background: #d9d9d9;
}

.culture-resource-item__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.culture-resource-item__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 21px;
}

.culture-resource-item__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.culture-resource-item__name {
  font-size: 16px;
  color: #333;
}

.culture-resource-item__type {
  font-size: 16px;
  color: #bc2220;
}

.culture-resource-item__description {
  margin: 0;
  font-size: 16px;
  color: #333;
  opacity: 0.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 地图 */
.culture-map__map {
  flex: 1;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(90deg, #ecd9ba 0%, #ecd9ba 100%);
  padding: 16px;
}

.culture-map__map-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
}

/* 地图标记点 */
.map-marker {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 21px;
}

.map-marker__label {
  padding: 8px 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #333;
  white-space: nowrap;
  position: relative;
}

.map-marker__label::after {
  content: '';
  position: absolute;
  bottom: -13.28px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 20px;
  height: 20px;
  background: white;
}

.map-marker__icon {
  width: 50px;
  height: 50px;
}

.map-marker__icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 地图详情卡片 */
.map-detail-card {
  position: absolute;
  width: 444px;
  background: white;
  border-radius: 8px;
  padding: 8px;
  display: flex;
  gap: 16px;
}

.map-detail-card__image {
  width: 160px;
  height: 120px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  background: #d9d9d9;
}

.map-detail-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.map-detail-card__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.map-detail-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #333;
}

.map-detail-card__type {
  color: #bc2220;
}

.map-detail-card__description {
  flex: 1;
  margin: 0;
  font-size: 14px;
  color: #333;
  opacity: 0.5;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
}

.map-detail-card__location {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #333;
  opacity: 0.5;
}

.map-detail-card__location span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

