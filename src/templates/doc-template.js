import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout/Layout';
import RightMenu from '../components/Layout/RightMenu';
import '../styles/doc-template.css';
import { Button } from '@material-ui/core';
import { Link } from 'gatsby';

const tableOfContents = require('../pages/table-of-contents.json');

export default function Template({
  data
}) {
  const { markdownRemark: post } = data
  const gitHubUrl = 'https://github.com/ordercloud-api/oc-documentation/tree/development/src/pages/docs';
  const section = tableOfContents.sections.find((section) => post.frontmatter.path.indexOf(section.path) > -1);
  const sectionIndex = tableOfContents.sections.findIndex((section) => post.frontmatter.path.indexOf(section.path) > -1);
  const guideIndex = section.guides.findIndex((guide) => `${section.path}${guide}` === post.frontmatter.path);

  function directionalButton(direction) {
    const newGuideIndex = direction === 'Previous' ? guideIndex - 1 : guideIndex + 1;
    const newSectionIndex = direction === 'Previous' ? sectionIndex - 1 : sectionIndex + 1;
    const newSection = tableOfContents.sections[newSectionIndex];
    const guideCondition = direction === 'Previous' ? guideIndex > 0 : newGuideIndex < section.guides.length;
    const sectionCondition = direction === 'Previous' ? newGuideIndex < section.guides.length : newGuideIndex >= section.guides.length - 1;
    return (
      guideCondition ? (
        <Button>
          <Link to={`${section.path}${section.guides[newGuideIndex]}`}>{direction} Guide</Link>
        </Button>
      ) : sectionCondition && newSection ? (
        <Button>
          <Link to={`${newSection.path}${newSection.guides[0]}`}>{direction} Section</Link>
        </Button> 
      ) : null
    )
  }

  return (
    <Layout>
      <div className="documentation-container" style={{margin: '0 3rem', display: 'flex', flexDirection: 'row'}}>
        <Helmet title={`OrderCloud Documentation - ${post.frontmatter.title}`} />
        <div className="documentation-body" style={{ maxWidth: '70%'}}>
          <h1>{post.frontmatter.title}</h1>
          <div
            className="documentation-contents"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          {directionalButton('Previous')}
          {directionalButton('Next')}         
          <a href={`${gitHubUrl}${post.frontmatter.path}.md`} target="_blank">Contribute to this doc</a>
        </div>
        <RightMenu style={{ maxWidth: '30%'}} tableOfContents={tableOfContents.sections} />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query DocTemplateByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`