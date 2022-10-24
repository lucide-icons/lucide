package dev.lucide.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType
import androidx.compose.ui.graphics.PathFillType.Companion.NonZero
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeCap.Companion.Round
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.ImageVector.Builder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import dev.lucide.Lucide

public val Lucide.PartyPopper: ImageVector
    get() {
        if (_partyPopper != null) {
            return _partyPopper!!
        }
        _partyPopper = Builder(name = "PartyPopper", defaultWidth = 24.0.dp, defaultHeight =
                24.0.dp, viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(5.8f, 11.3f)
                lineTo(2.0f, 22.0f)
                lineToRelative(10.7f, -3.79f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(4.0f, 3.0f)
                horizontalLineToRelative(0.01f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(22.0f, 8.0f)
                horizontalLineToRelative(0.01f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(15.0f, 2.0f)
                horizontalLineToRelative(0.01f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(22.0f, 20.0f)
                horizontalLineToRelative(0.01f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(22.0f, 2.0f)
                lineToRelative(-2.24f, 0.75f)
                arcToRelative(2.9f, 2.9f, 0.0f, false, false, -1.96f, 3.12f)
                verticalLineToRelative(0.0f)
                curveToRelative(0.1f, 0.86f, -0.57f, 1.63f, -1.45f, 1.63f)
                horizontalLineToRelative(-0.38f)
                curveToRelative(-0.86f, 0.0f, -1.6f, 0.6f, -1.76f, 1.44f)
                lineTo(14.0f, 10.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(22.0f, 13.0f)
                lineToRelative(-0.82f, -0.33f)
                curveToRelative(-0.86f, -0.34f, -1.82f, 0.2f, -1.98f, 1.11f)
                verticalLineToRelative(0.0f)
                curveToRelative(-0.11f, 0.7f, -0.72f, 1.22f, -1.43f, 1.22f)
                horizontalLineTo(17.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(11.0f, 2.0f)
                lineToRelative(0.33f, 0.82f)
                curveToRelative(0.34f, 0.86f, -0.2f, 1.82f, -1.11f, 1.98f)
                verticalLineToRelative(0.0f)
                curveTo(9.52f, 4.9f, 9.0f, 5.52f, 9.0f, 6.23f)
                verticalLineTo(7.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(11.0f, 13.0f)
                curveToRelative(1.93f, 1.93f, 2.83f, 4.17f, 2.0f, 5.0f)
                curveToRelative(-0.83f, 0.83f, -3.07f, -0.07f, -5.0f, -2.0f)
                curveToRelative(-1.93f, -1.93f, -2.83f, -4.17f, -2.0f, -5.0f)
                curveToRelative(0.83f, -0.83f, 3.07f, 0.07f, 5.0f, 2.0f)
                close()
            }
        }
        .build()
        return _partyPopper!!
    }

private var _partyPopper: ImageVector? = null
