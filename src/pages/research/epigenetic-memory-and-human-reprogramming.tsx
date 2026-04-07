import React from 'react';
import ResearchArticleLayout from '@site/src/components/research/ResearchArticleLayout';
import {researchArticles} from '@site/src/data/researchArticles';
import styles from '@site/src/components/research/research.module.css';

const article = researchArticles[0];

export default function EpigeneticMemoryArticle(): React.JSX.Element {
  return (
    <ResearchArticleLayout article={article}>
      <section>
        <h2>Why this node matters</h2>
        <p>
          Let’s clean the fog up early. When I say reprogramming, I am not doing cute sci-fi hand waving. I am talking
          about regulation, state, memory, and the machinery that decides what gets expressed, suppressed, stabilized,
          or made available for the next move. The DNA sequence is not the full story. That is exactly why epigenetics
          refuses to stay in the background.
        </p>
        <p>
          Van Andel Institute’s own framing is useful here: if the genome is the musical score, epigenetics is the way
          that score gets played. Same notes. Different performance. That is a nasty little insight because it means the
          real bottleneck is often not just what is written, but how state is being maintained. Once you understand
          that, the conversation about change gets sharper immediately.
        </p>
      </section>

      <section>
        <h2>Three signals the field keeps sending</h2>
        <div className={styles.articleDeck}>
          <div className={styles.deckRow}>
            <div className={styles.deckValue}>104,000 cells</div>
            <div>
              <div className={styles.deckBarTrack}>
                <div className={styles.deckBarFill} style={{width: '92%'}} />
              </div>
              <p>
                A 2025 Nature Genetics study profiled roughly 104,000 immune-cell nuclei to examine how exposures and
                genotype shape methylation and chromatin accessibility.
              </p>
            </div>
          </div>
          <div className={styles.deckRow}>
            <div className={styles.deckValue}>5–19%</div>
            <div>
              <div className={styles.deckBarTrack}>
                <div className={styles.deckBarFill} style={{width: '38%'}} />
              </div>
              <p>
                The same paper cites earlier bulk-tissue work estimating methylation heritability in that range. In
                plain language: biology is inheriting some structure, but context is still swinging real weight.
              </p>
            </div>
          </div>
          <div className={styles.deckRow}>
            <div className={styles.deckValue}>2014</div>
            <div>
              <div className={styles.deckBarTrack}>
                <div className={styles.deckBarFill} style={{width: '70%'}} />
              </div>
              <p>
                VAI’s current SU2C Epigenetics Dream Team was established in 2014, which tells you this is not a
                curiosity hobby. This is infrastructure-level commitment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2>Data story: what is actually shaping the system?</h2>
        <p>
          The immature take is to ask whether genes or environment matter more, like the field owes you a cheap winner.
          The smarter read is that epigenetic state is where multiple forces negotiate. That means the research is most
          useful when it tells us how much structure is inherited, how much remains plastic, and where intervention can
          actually move the needle.
        </p>
        <div className={styles.chartGrid}>
          <article className={styles.chartCard}>
            <div className={styles.chartLabel}>Dominant field signal</div>
            <h3>Context keeps touching the machinery</h3>
            <div className={styles.comparisonChart}>
              <div className={styles.comparisonRow}>
                <span>Exposure / environment</span>
                <div className={styles.comparisonTrack}>
                  <div className={styles.comparisonFillStrong} style={{width: '82%'}} />
                </div>
                <strong>82</strong>
              </div>
              <div className={styles.comparisonRow}>
                <span>Inherited structure</span>
                <div className={styles.comparisonTrack}>
                  <div className={styles.comparisonFillMid} style={{width: '48%'}} />
                </div>
                <strong>48</strong>
              </div>
              <div className={styles.comparisonRow}>
                <span>Deliberate intervention</span>
                <div className={styles.comparisonTrack}>
                  <div className={styles.comparisonFillAccent} style={{width: '67%'}} />
                </div>
                <strong>67</strong>
              </div>
            </div>
            <p>
              Not a literal universal score. A conceptual read from the papers: the field keeps saying inherited
              structure matters, but lived context and targeted intervention are absolutely in the room.
            </p>
          </article>

          <article className={styles.chartCard}>
            <div className={styles.chartLabel}>Interpretation stack</div>
            <h3>What each source contributes</h3>
            <div className={styles.clusterChart}>
              <div className={styles.clusterColumn}>
                <span className={styles.clusterValue}>Map</span>
                <div className={styles.clusterBar} style={{height: '74%'}} />
                <small>VAI program signal</small>
              </div>
              <div className={styles.clusterColumn}>
                <span className={styles.clusterValue}>Measure</span>
                <div className={styles.clusterBar} style={{height: '92%'}} />
                <small>single-cell profiling</small>
              </div>
              <div className={styles.clusterColumn}>
                <span className={styles.clusterValue}>Move</span>
                <div className={styles.clusterBar} style={{height: '68%'}} />
                <small>therapeutic perturbation</small>
              </div>
              <div className={styles.clusterColumn}>
                <span className={styles.clusterValue}>Edit</span>
                <div className={styles.clusterBar} style={{height: '64%'}} />
                <small>epigenetic editing</small>
              </div>
              <div className={styles.clusterColumn}>
                <span className={styles.clusterValue}>Constrain</span>
                <div className={styles.clusterBar} style={{height: '80%'}} />
                <small>chromatin barriers</small>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section>
        <h2>The reconstruction stack</h2>
        <p>
          Here is the conceptual model I care about. If you want change to become durable, you cannot stare at behavior
          alone and act surprised when the system snaps back. Behavior is the visible layer. Regulation is deeper.
          Memory is deeper than that. Context keeps whispering into all of it.
        </p>
        <div className={styles.frameworkDiagram}>
          <div className={styles.frameworkLayer}>
            <strong>Layer 1: Environment and exposure</strong>
            <span>Stress, nutrients, toxins, pathogens, social conditions, training, repetition.</span>
          </div>
          <div className={styles.frameworkLayer}>
            <strong>Layer 2: Epigenetic state</strong>
            <span>DNA methylation, histone marks, chromatin accessibility, transcription-factor routing.</span>
          </div>
          <div className={styles.frameworkLayer}>
            <strong>Layer 3: Cellular memory and identity</strong>
            <span>What the system remembers, what it can express quickly, and what it keeps suppressing.</span>
          </div>
          <div className={styles.frameworkLayer}>
            <strong>Layer 4: Human output</strong>
            <span>Function, resilience, failure modes, adaptation, and the visible pattern people call destiny.</span>
          </div>
        </div>
      </section>

      <section>
        <h2>Signal timeline: how this lane tightens up</h2>
        <div className={styles.timelineGrid}>
          <article className={styles.timelineCard}>
            <span className={styles.timelineYear}>2014</span>
            <h3>Dream Team formation</h3>
            <p>
              Van Andel Institute’s SU2C Epigenetics Dream Team locks in a translational posture. This lane is now
              explicitly trying to convert epigenetic insight into leverage.
            </p>
          </article>
          <article className={styles.timelineCard}>
            <span className={styles.timelineYear}>2024</span>
            <h3>Intervention gets sharper</h3>
            <p>
              Vitamin C / IDH1 AML work and epigenetic-editing reviews both signal the same thing: state is not sacred.
              It can be measured, pressured, and in some cases intentionally shifted.
            </p>
          </article>
          <article className={styles.timelineCard}>
            <span className={styles.timelineYear}>2025</span>
            <h3>Single-cell resolution gets serious</h3>
            <p>
              Large-scale immune-cell profiling makes the conversation more precise. Now we can inspect how genotype and
              context shape regulatory state at a much cleaner resolution.
            </p>
          </article>
        </div>
      </section>

      <section>
        <h2>Why Van Andel Institute is a serious signal here</h2>
        <p>
          VAI matters because it does not treat epigenetics like a fancy adjective. It treats it like a translational
          architecture problem. The Dream Team page makes that explicit: this is about understanding how epigenetic
          errors shape cancer development, treatment resistance, and therapeutic possibility. That framing is important
          because it keeps the field tied to consequence.
        </p>
        <p>
          The official VAI page also lists ongoing or completed clinical efforts combining epigenetic ideas with real
          interventions, from vitamin C strategies in myeloid malignancies to combinations of immunotherapy and
          epigenetic drugs. That is the part I respect. Not vibes. Not branding. Mechanism trying to become leverage.
        </p>
      </section>

      <section>
        <h2>Research pressure map</h2>
        <div className={styles.chartGrid}>
          <article className={styles.chartCard}>
            <div className={styles.chartLabel}>Constraint model</div>
            <h3>Why reprogramming is hard</h3>
            <div className={styles.metricList}>
              <div className={styles.metricRow}>
                <span>Chromatin barriers</span>
                <strong>High</strong>
              </div>
              <div className={styles.metricRow}>
                <span>Cell identity memory</span>
                <strong>High</strong>
              </div>
              <div className={styles.metricRow}>
                <span>Environmental plasticity</span>
                <strong>Medium-High</strong>
              </div>
              <div className={styles.metricRow}>
                <span>Therapeutic addressability</span>
                <strong>Rising</strong>
              </div>
            </div>
          </article>
          <article className={styles.chartCard}>
            <div className={styles.chartLabel}>Takeaway</div>
            <h3>The field is saying two things at once</h3>
            <ul className={styles.signalList}>
              <li>
                <span className={styles.check}>✓</span>
                <span>State has memory, so shallow interventions bounce off.</span>
              </li>
              <li>
                <span className={styles.check}>✓</span>
                <span>State also has plasticity, so sharp interventions are not pointless.</span>
              </li>
              <li>
                <span className={styles.check}>✓</span>
                <span>The real game is learning where the system is rigid versus where it can still be rewritten.</span>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section>
        <h2>Source table: what each paper is really giving me</h2>
        <div className={styles.articleTableWrap}>
          <table className={styles.articleTable}>
            <thead>
              <tr>
                <th>Source</th>
                <th>Core contribution</th>
                <th>What I take from it</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>VAI–SU2C Dream Team</td>
                <td>Institutional and translational map of epigenetics work tied to real disease intervention.</td>
                <td>The field is mature enough to justify disciplined public research building, not just inspiration.</td>
              </tr>
              <tr>
                <td>Nature Genetics 2025 immune-cell epigenome study</td>
                <td>Shows both genetics and exposure shape cell-type-specific epigenomic states.</td>
                <td>Context is not decoration. It is part of the machinery.</td>
              </tr>
              <tr>
                <td>Nature 2024 vitamin C / IDH1 AML paper</td>
                <td>Demonstrates that altered epigenetic states can be pushed by targeted metabolic intervention.</td>
                <td>State can be perturbed. Stability is real, but it is not untouchable.</td>
              </tr>
              <tr>
                <td>Cell 2024 epigenetic editing review</td>
                <td>Defines precision tools for altering regulatory state without rewriting DNA sequence.</td>
                <td>Programming language metaphors stop being metaphors when the tool chain gets specific enough.</td>
              </tr>
              <tr>
                <td>Epigenetics &amp; Chromatin 2025 review</td>
                <td>Clarifies how chromatin organization constrains identity and reprogramming.</td>
                <td>You do not reconstruct by affirmations alone. You reconstruct by changing what the system permits.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.mobileSourceCards}>
          <article className={styles.mobileSourceCard}>
            <strong>VAI–SU2C Dream Team</strong>
            <span>Institutional signal</span>
            <p>Translational epigenetics map tied to real intervention.</p>
            <p>The field is mature enough to justify serious public node-building.</p>
          </article>
          <article className={styles.mobileSourceCard}>
            <strong>Nature Genetics 2025</strong>
            <span>Immune-cell profiling</span>
            <p>Shows genotype and exposure both shape epigenomic state.</p>
            <p>Context is machinery, not background decoration.</p>
          </article>
          <article className={styles.mobileSourceCard}>
            <strong>Nature 2024 vitamin C / IDH1 AML</strong>
            <span>Intervention signal</span>
            <p>Altered epigenetic states can be pushed by metabolic intervention.</p>
            <p>State can be perturbed. Stability is real, not absolute.</p>
          </article>
          <article className={styles.mobileSourceCard}>
            <strong>Cell 2024 epigenetic editing</strong>
            <span>Tooling signal</span>
            <p>Precision editing of regulatory state without rewriting DNA sequence.</p>
            <p>The programming metaphor gets less metaphorical here.</p>
          </article>
          <article className={styles.mobileSourceCard}>
            <strong>Epigenetics &amp; Chromatin 2025</strong>
            <span>Constraint signal</span>
            <p>Explains chromatin barriers around identity and reprogramming.</p>
            <p>Durable change depends on what the system permits.</p>
          </article>
        </div>
      </section>

      <section>
        <h2>Where this connects back to AutoNateAI</h2>
        <p>
          I need to say this carefully so nobody starts hallucinating claims for me. AutoNateAI is not a biomedical
          treatment. It is an educational and cognitive-systems intervention. But the deep attraction is obvious: the
          same intellectual pattern keeps showing up. Systems change when state changes. Durable output changes when the
          memory layer changes. The visible behavior is downstream from architecture.
        </p>
        <p>
          That is why the portal language around reprogramming is not random. I am using it because the research keeps
          implying that reconstruction is less about motivational noise and more about changing what the system can do,
          stabilize, and repeat under pressure. Same human. Different accessible future.
        </p>
      </section>

      <section>
        <h2>Closing node</h2>
        <p>
          My current thesis is simple: epigenetics is one of the cleanest scientific mirrors for thinking about human
          reconstruction because it forces you to respect regulation, history, context, and constraint all at once. If
          you want deep change, you need a model for how state gets written, protected, destabilized, and rewritten.
          That is the lane.
        </p>
        <p>
          More nodes coming. This one is just the opening pressure test.
        </p>
      </section>
    </ResearchArticleLayout>
  );
}
