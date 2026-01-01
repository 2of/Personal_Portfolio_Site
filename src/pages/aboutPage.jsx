import React, { useEffect, useState, useCallback, useMemo } from "react";
import { ScrollableVerticalView, Section } from "../ui/scroll/VerticalScrollWithStickyHeaders";
import { StandardHeader } from "../ui/misc/Headers";
import s from "./styles/aboutPage.module.scss";
import { useContent } from "../contexts/ContentContext";
import { Loader } from "../ui/misc/Loader";
import ExpandableCareerTile from "../ui/cards/ExpandOnHoverCardCareerTile";
import StandardToggle from "../ui/standardControls/Toggle";
import QualificationCard from "../ui/cards/QualificationCard";
import StandardGrid from "../ui/grid/StandardGrid";
import { SkillCard } from "../ui/cards/SkillCard";
import { AboutCard } from "../ui/cards/discreteCards/aboutcard";

export const AboutPage = () => {
    const { get, getArticle } = useContent();

    const [hasLoaded, setHasLoaded] = useState(false);
    const [srcData, setSrcData] = useState(null);
    const [expandAllCareerTiles, setExpandAllCareerTiles] = useState(false);


    useEffect(() => {
        const load = async () => {
            const data = await get("about");
            setSrcData(data);
            setHasLoaded(true);
        };
        load();
    }, [get]);

    const toggleExpandAll = useCallback(() => {
        setExpandAllCareerTiles(v => !v);
    }, []);


    // 🔒 Stable Header component
    const CareerHeader = useCallback(() => (
        <StandardHeader
            textb1="career"
            variant="regular"
            rightChildren={
                <StandardToggle
                    type="checkbox"
                    checked={expandAllCareerTiles}
                    callback={toggleExpandAll}
                />
            }
        />
    ), [expandAllCareerTiles, toggleExpandAll]);

    // 🔒 Stable list reference
    const careerItems = useMemo(() => srcData?.career ?? [], [srcData]);
    const qualItems = useMemo(() => srcData?.qualifications ?? [], [srcData]);
    const skillItems = useMemo(() => srcData?.fullskills ?? [], [srcData]);
    if (!hasLoaded) return <Loader fillparent />;

    return (
        <ScrollableVerticalView staggerStart>
            <Section
                sticky
                Header={() => (
                    <StandardHeader
                        textb1="howdy"
                        texthighlight={srcData.title}
                        variant="regular"
                    />
                )}
            >
                
                <AboutCard
                title={srcData.title}
                subtitle={srcData.subtitle}
                description={srcData.description}
                areatitle={srcData.areatitle}/>
            </Section>

            <Section Header={CareerHeader} sticky>


                 <StandardGrid columns={2} gap="md">

          {careerItems.map((c, i) => (

   <StandardGrid.Item>
                        <ExpandableCareerTile
                            key={c.id ?? i}
                            c={c}

                            position={c.position}
                            company={c.company}
                            duration={c.duration}
                            location={c.location}
                            doing={c.doing}
                            techStack={c.coreskills}


                            //   expandAll={expandAllCareerTiles}
                            alwaysexpand={expandAllCareerTiles}

                        />

                        </StandardGrid.Item>
                    ))}


                </StandardGrid>
            </Section>
 <Section
                sticky
                Header={() => (
                    <StandardHeader
                        textb1="sooo"
                        texthighlight={"I can do    "}
                        variant="regular"
                    />
                )}
            >


                </Section>

            <Section
                sticky
                Header={() => (
                    <StandardHeader
                        textb1="big"
                        texthighlight={"quals"}
                        variant="regular"
                    />
                )}
            >



                 <StandardGrid columns={2} gap="md">
                     {qualItems.map((qual, i) => (

   <StandardGrid.Item>
                        <QualificationCard
                            key={qual.id ?? i}
                            c={qual}

                            title={qual.title}
                            field={qual.field}
                            gpatag={qual.gpatag}
                            institution={qual.where}
                            year={qual.year}
                        //   expandAll={expandAllCareerTiles}
                        //   alwaysexpand={expandAllCareerTiles}

                        />
                        </StandardGrid.Item>
                    ))}
                 </StandardGrid>
                
            </Section>

              <Section
                sticky
                Header={() => (
                    <StandardHeader
                        textb1="sooo"
                        texthighlight={"I can do    "}
                        variant="regular"
                    />
                )}
            >


                </Section>
            <Section
                sticky
                Header={() => (
                    <StandardHeader
                        textb1="things"
                        texthighlight={"I can do    "}
                        variant="regular"
                    />
                )}
            >

    
                 <StandardGrid columns={4} gap="md">
                     {skillItems.map((s, i) => (

   <StandardGrid.Item>
                        <SkillCard
                            key={s.id ?? i}
                            chunk={s}
              
                        />
                        </StandardGrid.Item>
                    ))}
                 </StandardGrid>

                {/* <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam earum, amet harum officiis ex deleniti autem expedita totam atque id dolorum ea quas numquam ipsa recusandae consequuntur voluptatum! Repudiandae voluptate sint facilis corporis ex. Repudiandae error quas dicta in incidunt aperiam, odit eos dolore nisi laboriosam nemo nobis, sit vero corrupti, placeat est voluptatum suscipit. Inventore ipsam modi nulla possimus exercitationem. Harum expedita debitis, officia quo vitae eum ipsa ipsum labore doloremque, quisquam voluptatum voluptatem repellendus. Sequi sapiente assumenda laboriosam autem est deserunt nisi voluptate aut, eum nobis, praesentium, magnam dignissimos. Dolorum illum recusandae doloribus maiores molestiae id ex autem consequuntur quo, esse ut iste architecto eveniet perspiciatis repellat commodi dignissimos voluptates consequatur? Ea optio, itaque consequuntur suscipit dolores autem laboriosam. Molestias accusantium sint quasi earum veniam consequatur consectetur quo neque aliquam ea excepturi officiis, corrupti minus at, dolore dolor nisi eos qui beatae? Nostrum rerum et architecto consequatur dolore, voluptatibus tempore saepe velit quo error cum praesentium aliquid assumenda quis debitis voluptatum veniam suscipit quidem animi! Excepturi dolor unde nemo quod vitae porro expedita ab ducimus? Suscipit rerum laudantium veritatis exercitationem quas tempore illum hic? Aliquam eius libero quasi voluptatum quis nam autem perspiciatis? Delectus sapiente minus voluptatem possimus. Commodi blanditiis repellendus corrupti expedita saepe quia voluptatem obcaecati dolore, nam similique. Consequuntur suscipit et repellendus aliquid nostrum doloribus, dolores numquam! At incidunt minima recusandae cumque iure pariatur nulla, dignissimos ut quaerat voluptatem placeat cupiditate aliquam vero corrupti debitis error maiores facere necessitatibus sit ullam, tempora, fugiat ratione quos. Dicta, nisi. Molestiae excepturi laudantium recusandae. Unde architecto commodi obcaecati minus, recusandae quaerat explicabo nobis fuga eos pariatur a, placeat eveniet esse minima dolores. Libero eos voluptatem aut quam, fugiat quibusdam dolores non quo dolorem voluptas eveniet temporibus debitis perferendis deleniti enim iste rem, eius animi amet necessitatibus alias cum delectus voluptatum consequatur! Necessitatibus, animi aliquid. Modi officiis quia, nam est, qui totam nostrum voluptatum, dolore minus molestiae ab. Alias modi harum dolorem voluptates ducimus porro, nesciunt esse illum maxime, aliquam consequuntur reprehenderit repudiandae. Totam at sequi velit veritatis. Ab laboriosam rem illum doloribus! Eius, cupiditate possimus! Aliquam nam, omnis at, numquam commodi iste iusto suscipit dolorem perferendis id impedit quod temporibus voluptas doloribus qui similique illum corrupti atque ad! Molestiae, quidem nihil delectus pariatur reiciendis iste possimus architecto doloremque eius dicta perspiciatis rerum quia ratione sapiente tempore quasi. Eaque quas, ex at nobis non modi animi officiis! Recusandae, nulla at! Exercitationem repudiandae alias cum eos deleniti, quia voluptates praesentium nulla molestiae excepturi doloremque, quis quo ab voluptatem qui at dignissimos minus ut necessitatibus. Vitae sit eaque maiores hic facere exercitationem facilis rem quis aut nam voluptate libero, amet blanditiis itaque dolor quam quo beatae unde suscipit similique reprehenderit ex iusto. Rerum consectetur impedit eum dolore, harum perferendis, deserunt aliquam nam dolores quasi ex aut quisquam assumenda quam neque atque saepe enim. Fugit eveniet commodi sequi culpa fuga inventore eligendi, repudiandae officia ipsam, consequuntur ullam aut numquam error dolor voluptatum hic facere qui a maxime maiores necessitatibus! Molestias porro pariatur ad, sapiente fugiat odit enim amet, harum dignissimos quos culpa sequi officiis doloribus quidem quasi esse tenetur velit debitis provident magnam voluptates quae! Voluptates iste, veritatis similique perferendis expedita molestias eos nostrum, nobis animi nulla culpa dolor voluptatum numquam perspiciatis et. Dolorum optio necessitatibus minus! Obcaecati aperiam, voluptas quisquam dolorum ex esse dolore inventore reprehenderit officia consequatur est dolor culpa at facere quasi unde aliquam, quibusdam ipsa alias! Soluta odit, debitis quo magnam, id ipsum dolore quod suscipit sed exercitationem quos. Mollitia quo nisi quam enim numquam alias voluptatum, incidunt omnis ducimus ipsum non dolore, officiis vel illo vero quas quaerat! Suscipit, explicabo esse totam cupiditate facilis, eos expedita quis porro similique adipisci eius eligendi. Voluptatum numquam ipsa pariatur ex ab nemo fuga beatae consequuntur? Illum accusamus labore cupiditate molestias architecto quo quia hic! Eveniet accusamus officia doloremque. Neque, porro nobis? Facere exercitationem repudiandae molestiae quasi minus? Tempore quisquam ratione odit quaerat est earum praesentium hic deserunt necessitatibus a fugit aliquam perspiciatis ad neque beatae, perferendis fuga iure quae iste doloremque id voluptatibus molestias voluptate maxime. Laborum tempore earum distinctio iste voluptatibus, maiores corrupti quisquam voluptas itaque animi ratione optio cum aut libero dignissimos provident! Sit expedita perferendis cupiditate libero possimus quas illum exercitationem nisi est cum officiis laboriosam quae, autem hic dolor labore explicabo obcaecati, nostrum deleniti! Eum neque sapiente ipsam dolor fugiat mollitia id earum eius magni dignissimos officiis nisi, corporis ea, suscipit fugit veniam sit, nesciunt necessitatibus tempora reprehenderit autem ipsum distinctio sequi atque. Cupiditate officiis corporis assumenda cum, suscipit maxime, eaque recusandae et rerum exercitationem dolores laboriosam, rem nostrum id! Perspiciatis modi sint ipsa temporibus ab eveniet eos reprehenderit hic neque officia deserunt blanditiis at dolorum, quis beatae quam. Architecto dignissimos recusandae perferendis error iste! Ratione quae et saepe voluptatibus assumenda tempore ea explicabo vero, hic veniam consequuntur sunt doloremque? Temporibus aliquid dignissimos deleniti architecto voluptatem, quos, distinctio obcaecati tenetur eos quibusdam quis minima voluptate dolores aut iure rerum adipisci provident pariatur dicta quasi velit repellendus debitis! Repellendus vitae laborum expedita! Eligendi adipisci veniam magni earum dolorem. Eveniet, maxime. Vitae officia ut suscipit fugit animi unde dolor corporis similique tempore. Accusamus asperiores quia sequi quas totam molestias, omnis fuga autem, libero adipisci praesentium saepe. Totam dolor veritatis, recusandae enim omnis facilis ipsam doloremque, magnam iusto quae possimus id dolores fuga debitis ratione, eaque in excepturi nam at sint. Quis expedita animi corporis nobis vel illo amet aut vero autem. Dolores iste saepe culpa magnam veniam accusantium vel quos atque sapiente consequatur quia praesentium suscipit, natus perferendis quod, sint aspernatur ipsa harum amet reiciendis porro nisi? Rem nam ullam quia nulla laboriosam amet fugiat libero officia sequi repellat impedit atque consequuntur aut harum repellendus, vero dolorem, quisquam doloremque porro ipsam! Cumque maiores harum tempora fuga odit quo molestiae voluptate. Aliquid autem minima expedita porro sapiente, mollitia, deserunt magnam cum alias repellat, atque esse beatae? Ab, assumenda non facilis ea ullam id error? Velit impedit sapiente explicabo ab reiciendis quos esse officia quis dicta repellat, architecto dolores incidunt amet?</p> */}
            </Section>




        </ScrollableVerticalView>
    );
};
