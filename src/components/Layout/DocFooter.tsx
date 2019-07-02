import React from 'react';
import { ThumbUp, ThumbDown } from '@material-ui/icons';
import { groupBy as _groupBy, forEach as _forEach, flatten as _flatten } from 'lodash';
import { Button } from '@material-ui/core';
import { Link } from 'gatsby';

class DocFooter extends React.Component<any> {
    
    public render() {
        const { contents, currentGuide } = this.props;

        const gitHubUrl = 'https://github.com/ordercloud-api/oc-documentation/tree/development/src/pages/docs';
        const flatContents = _flatten(contents.map((c) => c.sections));
        const guideIndex = flatContents.findIndex((section) => section.frontmatter.path === currentGuide);
        
        const directionalButton = (direction) => {
            const newGuideIndex = direction === 'Previous' ? guideIndex - 1 : guideIndex + 1;
            return (
                newGuideIndex > 0 && newGuideIndex < flatContents.length - 1 ? (
                    <Button>
                        <Link to={flatContents[newGuideIndex].frontmatter.path}>{direction} Guide</Link>
                    </Button>
                    ) : null
            );
        }

        return(
            <div>
                {directionalButton('Previous')}
                {directionalButton('Next')}
                <ThumbUp />
                <ThumbDown />
                Was this guide helpful?
                <a href={`${gitHubUrl}${currentGuide}.md`} target="_blank" rel="noopener noreferrer">Contribute to this doc</a>
            </div>
        )
    }
}

export default DocFooter;