// import React from 'react';
// import styled from 'styled-components';
// import PostPortal from '../../Portals/PostPortal';
// import { ChevronLeft } from '@styled-icons/entypo/ChevronLeft';
// import { ChevronRight } from '@styled-icons/entypo/ChevronRight';

// const BookmarksModal = () => {
//   const lastIndex = posts.length - 1;

//   useEffect(() => {
//     modalRef.current.style.transform = `translate(-${
//       95 * activeIndexValue
//     }rem)`;
//   }, [activeIndexValue]);

//   const onCloseButton = () => {
//     dispatch(closePopup('postModal'));
//     his.push(`${path}`);
//   };

//   const handlePrev = e => {
//     e.stopPropagation();
//     modalRef.current.style.transform = `translate(-${95 * (index - 1)}rem)`;
//     dispatch(activePostIdData(posts[index - 1].id));
//     dispatch(activeIndex(index - 1));
//   };

//   const handleNext = e => {
//     e.stopPropagation();
//     modalRef.current.style.transform = `translate(-${95 * (index + 1)}rem)`;
//     dispatch(activePostIdData(posts[index + 1].id));
//     dispatch(activeIndex(index + 1));
//   };

//   const onClickOutside = e => {
//     if (e.target.name === 'cancel') return;
//     if (
//       postModalState &&
//       modalRef.current &&
//       !modalRef.current.contains(e.target)
//     ) {
//       dispatch(closePopup('postModal'));
//       his.push(`${path}`);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('click', onClickOutside, { capture: true });
//     return () => {
//       window.removeEventListener('click', onClickOutside, { capture: true });
//     };
//   }, []);

//   useEffect(() => {
//     history.pushState('', '', `/p/${activePostId}`);
//   }, []);

//   return (
//     <PostPortal>
//       <StPostModalWrapper>
//         <StPostCarousel>
//           <StPostCarouselInner ref={modalRef}>
//             {/* {posts.map(post => {
//               return <PostModalItem post={post} key={post.id} />;
//             })} */}
//           </StPostCarouselInner>
//           <StSlideButton
//             type="button"
//             role="prev"
//             onClick={handlePrev}
//             hidden={index === 0 ? true : false}
//           >
//             <StPrevButtonIcon />
//           </StSlideButton>
//           <StSlideButton
//             type="button"
//             role="next"
//             onClick={handleNext}
//             hidden={index === lastIndex ? true : false}
//           >
//             <StNextButtonIcon />
//           </StSlideButton>
//           <StCloseButton type="button" onClick={onCloseButton}>
//             <CloseOutline />
//           </StCloseButton>
//         </StPostCarousel>
//       </StPostModalWrapper>
//     </PostPortal>
//   );
// };

// const StPostModalWrapper = styled.div`
//   position: fixed;
//   top: 0;
//   z-index: 3;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: rgba(0, 0, 0, 0.5);
//   width: 100%;
//   height: 100vh;
// `;

// const StPostCarousel = styled.div`
//   background: ${({ theme }) => theme.white};
//   width: 95rem;
//   min-width: 95rem;
//   height: 59.9rem;
//   overflow: hidden;
// `;

// const StPostCarouselInner = styled.main`
//   height: 100%;
//   display: flex;
//   flex-flow: row nowrap;
//   background: ${({ theme }) => theme.white};
// `;

// const buttonStyle = css`
//   width: 4rem;
//   height: 4rem;
//   color: ${({ theme }) => theme.gray8};
//   cursor: pointer;
//   text-shadow: 5px 5px ${({ theme }) => theme.black};
//   &:active {
//     color: ${({ theme }) => theme.gray5};
//   }
// `;

// const StSlideButton = styled.div`
//   width: 4rem;
//   height: 4rem;

//   position: absolute;
//   top: calc(50% - 2rem);
//   right: ${({ role }) => role === 'next' && 'calc((100vw - 95rem) / 2 - 4rem)'};
//   left: ${({ role }) => role === 'prev' && 'calc((100vw - 95rem) / 2 - 4rem)'};
//   z-index: 4;
// `;

// const StNextButtonIcon = styled(ChevronRight)`
//   ${buttonStyle}
// `;

// const StPrevButtonIcon = styled(ChevronLeft)`
//   ${buttonStyle}
// `;

// const StCloseButton = styled.button`
//   position: absolute;
//   top: 1rem;
//   right: 1rem;

//   width: 3rem;
//   height: 3rem;
//   color: ${({ theme }) => theme.white};
//   font-size: 2rem;
//   cursor: pointer;
// `;

// export default BookmarksModal;
